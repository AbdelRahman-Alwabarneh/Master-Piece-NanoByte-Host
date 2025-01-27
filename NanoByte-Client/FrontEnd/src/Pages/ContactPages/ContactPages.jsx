import React, { useState } from 'react';
import axios from 'axios';
import { Facebook, Instagram, Mail, Phone, Send } from 'lucide-react';

import { RxDiscordLogo } from "react-icons/rx";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/Contact`, {
        name: formData.name,
        email: formData.email,
        description: formData.description
      });
      setMessage({ type: 'success', content: 'تم إرسال الرسالة بنجاح. سيتم التواصل معكم عبر البريد الإلكتروني الخاص بكم.' });
      setFormData({ name: '', email: '', phone: '', description: '' });
    } catch (error) {
      setMessage({ type: 'error', content: error.response?.data?.message || 'Failed to send message' });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: RxDiscordLogo, href: '#', color: 'hover:text-indigo-500' }
  ];

  return (
    <>
    <Header/>
    <div className="font-cairo max-w-6xl  mx-auto p-6 mt-[100px] [direction:rtl]">
      <div className="relative bg-white/10 backdrop-blur-md shadow-lg rounded-3xl overflow-hidden">
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-blue-400/20"></div>
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400/20"></div>
        
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="flex flex-col justify-center space-y-6 text-white">
            <h2 className="text-3xl font-bold">اتصل بنانوبايت هوست</h2>
            <p className="text-gray-300">نحن هنا لمساعدتك. أرسل لنا رسالة وسنقوم بالرد عليك في أقرب وقت ممكن.</p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400 ml-1" />
                <a href="mailto:nanobytehost@gmail.com" className="hover:text-blue-400 transition">nanobytehost@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3 ">
                <Phone className="text-blue-400 ml-1" />
                <a href="tel:+962778997053" className="hover:text-blue-400 transition">+962 778 997 053</a>
              </div>
            </div>

            <div className="flex  pt-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className={`p-2 mx-1 rounded-full bg-white/5 hover:bg-white/10 transition ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          {message.content && (
              <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                {message.content}
              </div>
            )}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="الأسم"
              className="w-full bg-white/5 rounded-lg py-3 px-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="البريد الألكتروني"
              className="w-full bg-white/5 rounded-lg py-3 px-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
     
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="الرسالة"
              rows="6"
              className="w-full bg-white/5 rounded-lg py-3 px-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition max-h-64"
              required
            />
            
           

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 px-6 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send  className='ml-1' size={18} />
                  <span>أرسال الرسالة</span>
                </>
              )}
            </button>
            <p className="text-sm text-gray-400 text-center">
              * سيتم الرد على استفسارك في أقرب وقت ممكن عبر البريد الإلكتروني
            </p>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default ContactForm;