function generateMail(response) {
  return `Welcome to Qkart - Your Journey Begins Here!
                
Dear ${response.username},
    
Welcome to Qkart, your one-stop destination for everything you need. We're thrilled to have you on board, and we're here to make your shopping experience delightful and convenient.
    
Here's what you can explore on Qkart:
    
    1. **Discover Our Vast Selection:**
       From electronics to fashion, books to home essentials, find it all on Qkart. Explore our extensive catalog and discover products that match your style and needs.
    
    2. **Your Personalized Recommendations:**
       We've curated personalized recommendations just for you. Explore your recommendations on your homepage and discover new products based on your preferences.
    
    3. **Fast and Reliable Delivery:**
       Enjoy fast and reliable delivery on millions of items. Choose from various delivery options to fit your schedule, including Prime for expedited shipping.
    
    4. **Secure and Hassle-Free Shopping:**
       Shop with confidence knowing that your transactions are secure. Our customer service team is available 24/7 to assist you with any questions or concerns.
    
    5. **Stay Connected:**
       Follow us on social media for updates on the latest deals, product launches, and more. Join the Qkart community and be part of something amazing.
    
Thank you for choosing Qkart. We're committed to providing you with an exceptional shopping experience.
    
Happy shopping!
    
Best regards,
    
The Qkart Team`;
}

module.exports = generateMail;
