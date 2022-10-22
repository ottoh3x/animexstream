import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import {motion,AnimatePresence} from "framer-motion"
import emailjs from "emailjs-com";
import Backdrop from './BackDrop';

function Contact({showContact,hideContact}) {
    const [show,setShow] = useState(false)
    const { theme } = useSelector((state) => state);

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_27otgd3",
        "template_nu3nlna",
        form.current,
        "wRGAYlk4r9LSqyEFS",
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    form.current.reset();
  };

  return (
    <>
    <AnimatePresence>
{showContact && (

<Backdrop onClick={hideContact}>
<motion.div initial={{x:"100vh"}} animate={{x:0,transition:{duration:0.2}}} exit={{x:"100vh"}} onClick={e => e.stopPropagation()} className={`fixed  h-screen p-4 overflow-y-auto  z-100 w-80 ${theme.background}  transition-all right-0 top-0 `} >
   <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg className="w-5 h-5 mr-2"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>Contact us</h5>
   <button type="button"onClick={hideContact}  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
      <svg  className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      <span className="sr-only">Close menu</span>
   </button>
   <form  ref={form} onSubmit={sendEmail} className="mb-6">
   <div className="mb-3">
         <label htmlFor="name" className={`block mb-2 text-sm font-bold ${theme.text.selected} `}>Your Name</label>
         <input type="text"
              name="name"
              id="name" className="bg-neutral-900 border border-gray-800 outline-none p-3 w-full text-gray-200 text-sm rounded-sm " placeholder="Your Name" required="" />
      </div>
      <div className="mb-3">
         <label htmlFor="email" className={`block mb-2 text-sm font-bold ${theme.text.selected} `}>Your email</label>
         <input type="email"
              name="email"
              id="email" className="bg-neutral-900 border border-gray-800 outline-none p-3 w-full text-gray-200 text-sm rounded-sm " placeholder="name@gmail.com" required="" />
      </div>
      <div className="mb-3">
         <label htmlFor="subject" className={`block mb-2 text-sm font-bold ${theme.text.selected}`}>Subject</label>
         <input type="text" id="subject" className="bg-neutral-900 border border-gray-800 outline-none p-3 w-full text-gray-200 text-sm rounded-sm " placeholder="Subject" />
      </div>
      <div className="mb-3">
         <label htmlFor="message" className={`block mb-2 text-sm font-bold ${theme.text.selected}`}>Your Message</label>
         <textarea name="message"
              id="message" rows="4" className="block p-2.5 w-full bg-neutral-900 text-sm text-white bg-gray-150 rounded-lg border border-gray-800 " placeholder="Your message..." required></textarea>
      </div>
      <button type="submit" className="text-white bg-blue-700  w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-blue-900 block">Send</button>
   </form>
   <p className="mb-2 text-sm text-gray-500 ">
      <a href="#" className="hover:underline">ottoprogrammer@gmail.com</a>
   </p>
   <p className="text-sm text-gray-500 ">
      <a href="#" className="hover:underline">Animex Stream</a>
   </p>
</motion.div >
</Backdrop> 
)}
</AnimatePresence>
  </>
  )
}

export default Contact