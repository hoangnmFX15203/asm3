var nodemailer = require('nodemailer');


const sendMail = async ({ email, products, subject, name, link, total }) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

   

    const html =  `
    <h2>Dear ${name},</h2>
    <p>Thank you for your order. Your order details are as follows:</p>
    
    <table border="1">
      <thead>
        <tr>
          <th>Product</th>
          <th>Thumbnail</th>
          <th>Quantity</th>
          <th>Price per unit</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product => `
          <tr>
            <td>${product.title}</td>
            <td><img src="${product?.thumbnail}" alt="${product.title}" style="width:50px;height:50px;"></td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <p>Total: ${total}</p>
    <p>You can view your order <a href="${link}">here</a>.</p>
    <p>Thank you for shopping with us!</p>
  `
    

    let info = await transporter.sendMail({
        from: '"Cua hang dien tu" <no-reply@cuahangdientu.com>',
        to: email,
        subject: subject,
        html: html,
    });

    return info;
};

module.exports = sendMail;
