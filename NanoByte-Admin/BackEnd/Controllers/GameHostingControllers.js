const GameHosting = require('../Models/GameHostingModels');

exports.createGameServerPlan = async (req, res) => {
    try {
      const { gameData } = req.body;
  
      // Check for required fields
      if (
        !gameData.planName ||
        !gameData.ram ||
        !gameData.cpu ||
        !gameData.storage ||
        !gameData.connectionSpeed ||
        !gameData.security ||
        !gameData.databases ||
        !gameData.productLink
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Create a new Game Server Plan
      const newGameServerPlan = await GameHosting.create({
        planName: gameData.planName,
        ram: gameData.ram,
        cpu: gameData.cpu,
        storage: gameData.storage,
        connectionSpeed: gameData.connectionSpeed,
        security: gameData.security,
        databases: gameData.databases,
        subscriptionDurations: {
          oneMonth: {
            price: gameData.prices.find(p => p.duration === 1)?.price || null,
            enabled: gameData.prices.find(p => p.duration === 1) !== undefined,
          },
          twoMonths: {
            price: gameData.prices.find(p => p.duration === 2)?.price || null,
            enabled: gameData.prices.find(p => p.duration === 2) !== undefined,
          },
          threeMonths: {
            price: gameData.prices.find(p => p.duration === 3)?.price || null,
            enabled: gameData.prices.find(p => p.duration === 3) !== undefined,
          },
          fourMonths: {
            price: gameData.prices.find(p => p.duration === 4)?.price || null,
            enabled: gameData.prices.find(p => p.duration === 4) !== undefined,
          },
          fiveMonths: {
            price: gameData.prices.find(p => p.duration === 5)?.price || null,
            enabled: gameData.prices.find(p => p.duration === 5) !== undefined,
          },
          sixMonths: {
            price: gameData.prices.find(p => p.duration === 6)?.price || null,
            enabled: gameData.prices.find(p => p.duration === 6) !== undefined,
          },
        },
        setupFee: gameData.setupFee || 0,
        quantity: gameData.quantity || 0,
        isUnlimited: gameData.isUnlimited,
        productLink: gameData.productLink,
        groupId: gameData.groupId,
        groupName: gameData.groupName,
        isHidden: gameData.isHidden || false,
      });
  
      res
        .status(201)
        .json({ message: "Game server plan created successfully", GameServer: newGameServerPlan });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
      console.error({ message: "Internal server error", error: error.message });
    }
  };

  exports.GameServerPlanDetails= async (req, res) => {
    try {
      const GameServerPlan = await GameHosting.findById(req.params.id);
  
      res.status(200).json({ GameServerPlan });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.updateGameHostingPlan = async (req, res) => {
    const { gameData } = req.body;
    
    try {
      // Find Game Hosting plan by ID
      const gamePlan = await GameHosting.findById(req.params.id);
  
      if (!gamePlan) {
        return res.status(404).json({ message: "Game hosting plan not found" });
      }
      // Update the Game Hosting plan properties
      gamePlan.planName = gameData.name || gamePlan.planName;
      gamePlan.ram = gameData.ram || gamePlan.ram;
      gamePlan.cpu = gameData.processor || gamePlan.cpu;
      gamePlan.storage = gameData.storage || gamePlan.storage;
      gamePlan.connectionSpeed = gameData.connectionSpeed || gamePlan.connectionSpeed;
      gamePlan.security = gameData.protection || gamePlan.security;
      gamePlan.databases = gameData.databases || gamePlan.databases;
      gamePlan.setupFee = gameData.setupFee || gamePlan.setupFee;
      gamePlan.quantity = gameData.quantity || gamePlan.quantity;
      gamePlan.isUnlimited = gameData.isUnlimited;
      gamePlan.productLink = gameData.productLink || gamePlan.productLink;
      gamePlan.groupId = gameData.groupId || gamePlan.groupId;
      gamePlan.groupName = gameData.groupName || gamePlan.groupName;
      gamePlan.isHidden = gameData.isHidden !== undefined ? gameData.isHidden : gamePlan.isHidden;
  
      // Update subscription durations
      const subscriptionDurations = ['oneMonth', 'twoMonths', 'threeMonths', 'fourMonths', 'fiveMonths', 'sixMonths'];
  
      subscriptionDurations.forEach(duration => {
        if (gameData.subscriptionDurations && gameData.subscriptionDurations[duration]) {
          gamePlan.subscriptionDurations[duration] = {
            price: gameData.subscriptionDurations[duration].price || gamePlan.subscriptionDurations[duration].price,
            enabled: gameData.subscriptionDurations[duration].enabled !== undefined 
              ? gameData.subscriptionDurations[duration].enabled 
              : gamePlan.subscriptionDurations[duration].enabled,
          };
        }
      });
  
      // Save updated Game Hosting plan
      await gamePlan.save();
  
      res.status(200).json({ message: "Game hosting plan updated successfully", gamePlan });
    } catch (error) {
      res.status(500).json({ message: "Error updating game hosting plan", error });
    }
  };
  
  exports.HiddenGameHostingPlan = async (req, res) => {
    try {    
      const HiddenGameHosting = await GameHosting.findById(req.params.id);
      if (!HiddenGameHosting) {
        return res.status(404).json({ message: 'Website Hosting Server not found' });
      }
      HiddenGameHosting.isHidden = !HiddenGameHosting.isHidden;
      await HiddenGameHosting.save();
  
      res.status(200).json({ message: 'Hidden Dedicated Server successfully', HiddenGameHosting });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };