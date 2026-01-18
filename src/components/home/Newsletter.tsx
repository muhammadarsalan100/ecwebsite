"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className='w-full overflow-hidden' style={{ marginTop: "150px", marginBottom: "120px", minHeight: "624px" }}>
      <div className='max-w-7xl mx-auto px-4 relative h-full'>
        <div className='flex items-center justify-center relative' style={{ minHeight: "624px" }}>
          {/* Left Model Image */}
          <motion.div 
            className='hidden lg:block absolute left-0 top-0'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src='/man.png'
              alt='Male Model'
              width={281}
              height={624}
              className='object-contain'
            />
          </motion.div>

          {/* Center Content */}
          <div className='flex flex-col items-center text-center z-10'>
            {/* Title */}
            <motion.h2
              style={{
                color: "#484848",
                textAlign: "center",
                fontFamily: "var(--font-volkhov)",
                fontSize: "38.445px",
                fontWeight: 400,
                lineHeight: "normal",
                marginBottom: "16px",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Subscribe To Our Newsletter
            </motion.h2>

            {/* Description */}
            <motion.p
              style={{
                width: "513.158px",
                maxWidth: "100%",
                color: "#8A8A8A",
                textAlign: "center",
                fontFamily: "var(--font-poppins)",
                fontSize: "13.372px",
                fontWeight: 400,
                lineHeight: "21.73px",
                marginBottom: "32px",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
              ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </motion.p>

            {/* Email Input Container */}
            <motion.div
              className='flex flex-col items-center gap-4'
              style={{
                width: "527.366px",
                maxWidth: "100%",
                padding: "12px",
                background: "#FFF",
                boxShadow:
                  "0 136.229px 66.861px 0 rgba(1, 141, 242, 0.04), 0 88.297px 39.157px 0 rgba(1, 141, 242, 0.03), 0 52.473px 21.296px 0 rgba(1, 141, 242, 0.02), 0 27.246px 10.865px 0 rgba(1, 141, 242, 0.02), 0 11.1px 5.448px 0 rgba(1, 141, 242, 0.02), 0 2.523px 2.631px 0 rgba(1, 141, 242, 0.01)",
                borderRadius: "8px",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Email Input */}
              <input
                type='email'
                placeholder='michael@ymail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full outline-none'
                style={{
                  color: "#8A8A8A",
                  fontFamily: "var(--font-poppins)",
                  fontSize: "14px",
                  fontWeight: 400,
                  textAlign: "center",
                  padding: "12px",
                  background: "transparent",
                }}
              />
            </motion.div>

            {/* Subscribe Button */}
            <motion.button
              style={{
                width: "173.003px",
                height: "46.803px",
                borderRadius: "8.358px",
                background: "#0092FE",
                boxShadow: "0 16.715px 29.252px 0 rgba(0, 146, 254, 0.15)",
                color: "#FFF",
                fontFamily: "var(--font-poppins)",
                fontSize: "14px",
                fontWeight: 500,
                marginTop: "24px",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 35px 0 rgba(0, 146, 254, 0.25)" }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe Now
            </motion.button>
          </div>

          {/* Right Model Image */}
          <motion.div 
            className='hidden lg:block absolute right-0 top-0'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src='/woman.png'
              alt='Female Model'
              width={281}
              height={624}
              className='object-contain'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
