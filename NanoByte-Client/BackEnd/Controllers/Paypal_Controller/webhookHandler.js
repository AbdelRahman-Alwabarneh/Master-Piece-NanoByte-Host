const verifySignature = require('./paypalVerification');
const ordersModels = require("../../Models/ordersModels");
exports.handleWebhook = async (req, res) => {
  try {
    console.log("PayPal webhook received");

    const webhookBody = req.body;
    const headers = req.headers;

    const requiredHeaders = [
      'paypal-transmission-id',
      'paypal-transmission-time',
      'paypal-cert-url',
      'paypal-auth-algo',
      'paypal-transmission-sig'
    ];
    
    const missingHeaders = requiredHeaders.filter(header => !headers[header]);
    if (missingHeaders.length > 0) {
      return res.status(400).send("Missing PayPal signature headers");
    }

    const isValid = await verifySignature(headers, webhookBody);
    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return res.status(401).send("Unauthorized - Invalid Signature");
    }
    const eventType = webhookBody.event_type;
    const paypalResourceID = webhookBody.resource?.id;
    const customID = webhookBody.resource?.custom_id || "new_order";
    const reason = webhookBody.resource?.status_details?.reason || null;

    // helper function to handle order update
    const updateOrder = async (updateData, logMessage) => {
      try {
        if (customID === "new_order") {
          const existingOrder = await ordersModels.findOne({ paypalResourceID });
    
          if (!existingOrder) {
            console.warn(`⚠️ No matching order found for PayPal Resource ID: ${paypalResourceID}`);
            return;
          }
    
          // ✅ حماية من التكرار
          if (existingOrder.paymentStatus === updateData.paymentStatus) {
            console.log(`🔁 Duplicate webhook ignored for PayPal Resource ID: ${paypalResourceID}`);
            return;
          }
    
          const updated = await ordersModels.findOneAndUpdate(
            { paypalResourceID },
            updateData,
            { new: true }
          );
    
          console.log(`✅ Order updated: ${updated._id} | ${logMessage}`);
        }
      } catch (err) {
        console.error("❌ Error updating order:", err.message);
      }
    };
    

    switch (eventType) {
        case 'PAYMENT.CAPTURE.COMPLETED':
          await updateOrder(
            { paymentStatus: "Completed" },
            "Payment completed"
          );
          break;
        case 'PAYMENT.CAPTURE.DENIED':
          await updateOrder(
            { paymentStatus: "Failed", failureReason: reason },
            "Payment denied"
          );
          break;
        case 'PAYMENT.CAPTURE.PENDING':
        await updateOrder(
          { paymentStatus: "Pending" },
          "Payment pending"
        );
          break;
        case 'PAYMENT.CAPTURE.REFUNDED':
          await updateOrder(
            {
              paymentStatus: "Refound",
              orderStatus: "Cancelled",
              refundNote: reason
            },
            "Payment refunded"
          );
          break;
        case 'PAYMENT.CAPTURE.REVERSED':
          await updateOrder(
            {
              paymentStatus: "Refound",
              orderStatus: "Fraud",
              refundNote: reason
            },
            "Payment reversed"
          );
          break;
        case 'PAYMENT.REFUND.CANCELLED':
          console.log('❌ Payment refund cancelled:', webhookBody.resource.id);
          break;
        case 'PAYMENT.REFUND.COMPLETED':
          console.log('✅ Payment refund completed:', webhookBody.resource.id);
          break;
        case 'PAYMENT.REFUND.DENIED':
          console.log('❌ Payment refund denied:', webhookBody.resource.id);
          break;
        case 'PAYMENT.REFUND.FAILED':
          console.log('❌ Payment refund failed:', webhookBody.resource.id);
          break;
        case 'PAYMENT.REFUND.PENDING':
          console.log('⚠️ Payment refund pending:', webhookBody.resource.id);
          break;
        case 'CHECKOUT.ORDER.APPROVED':
          console.log('✅ Order approved:', webhookBody.resource.id);
          break;
        case 'CUSTOMER.SUPPORT.CHARGEBACK.DECISION-RESPONDED':
          console.log('⚖️ Chargeback decision responded:', webhookBody.resource.id);
          break;
        case 'CUSTOMER.DISPUTE.CREATED':
          console.log('⚠️ Customer dispute created:', webhookBody.resource.id);
          break;
        case 'CUSTOMER.DISPUTE.RESOLVED':
          console.log('✅ Customer dispute resolved:', webhookBody.resource.id);
          break;
        case 'CUSTOMER.DISPUTE.UPDATED':
          console.log('🔄 Customer dispute updated:', webhookBody.resource.id);
          break;
        case 'CUSTOMER.PAYOUT.COMPLETED':
          console.log('✅ Customer payout completed:', webhookBody.resource.id);
          break;
        case 'CUSTOMER.PAYOUT.FAILED':
          console.log('❌ Customer payout failed:', webhookBody.resource.id);
          break;
        default:
          console.log('⚠️ Unhandled event type:', webhookBody.event_type);
      }

    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error('❌ Error processing PayPal webhook:', error.message);
    res.status(500).send('Error processing webhook');
  }
};
