import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderSuccessPage.css';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  // Fetch the order details from our mock database (localStorage)
  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem('globalMartOrders')) || [];
    const currentOrder = existingOrders.find(o => o.id === orderId);
    setOrder(currentOrder);
  }, [orderId]);

  const handleDownloadReceipt = () => {
    if (!order) return;

    // Ensure jsPDF and autoTable are loaded from the window object
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('PDF generation library is not available. Please try again.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // --- PDF Content ---

    // 1. Title
    doc.setFontSize(22);
    doc.text("Order Receipt", 105, 20, { align: "center" });

    // 2. Order Info
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 14, 40);
    const orderDate = new Date(order.timestamp);
    doc.text(`Order Date: ${orderDate.toLocaleDateString()} ${orderDate.toLocaleTimeString()}`, 14, 48);

    // 3. Shipping Address
    doc.setFontSize(16);
    doc.text("Shipping Address", 14, 68);
    doc.setFontSize(12);
    const shippingInfo = [
        order.shippingAddress.fullName,
        order.shippingAddress.address1 + (order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ''),
        `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`,
        order.shippingAddress.country
    ];
    doc.text(shippingInfo, 14, 76);

    // 4. Payment Method
    doc.setFontSize(16);
    doc.text("Payment Method", 14, 105);
    doc.setFontSize(12);
    doc.text(order.paymentMethod, 14, 113);

    // 5. Products Table
    const tableHead = [['Product Name', 'Quantity', 'Unit Price', 'Subtotal']];
    const tableBody = order.items.map(item => [
        item.name,
        item.quantity,
        item.price,
        `$${(item.quantity * parseFloat(item.price.replace('$', ''))).toFixed(2)}`
    ]);

    doc.autoTable({
        startY: 130,
        head: tableHead,
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [15, 23, 42] } // Dark blue theme
    });

    // 6. Totals
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(`Items Total: $${order.totals.items}`, 140, finalY + 15);
    doc.text(`Shipping: $${order.totals.shipping}`, 140, finalY + 23);
    doc.text(`Tax: $${order.totals.tax}`, 140, finalY + 31);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Grand Total: $${order.totals.grandTotal}`, 140, finalY + 41);

    // 7. Footer
    doc.setFontSize(10);
    doc.text("Thank you for your purchase at GlobalMart!", 105, 280, { align: "center" });

    // 8. Save the PDF
    doc.save(`receipt-${order.id}.pdf`);
  };

  return (
    <div className="page-container order-success-page">
      <div className="success-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <h1 className="section-heading">Order Successful!</h1>
      <p className="section-subtitle">
        Thank you for your purchase. Your order ID is: <strong>{orderId}</strong>
      </p>

      {order && (
        <div className="order-receipt">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Order Placed:</span>
            <span>{new Date(order.timestamp).toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Total:</span>
            <span>${order.totals.grandTotal}</span>
          </div>
           <p>An email receipt has been sent to your address (simulated).</p>
        </div>
      )}

      <div className="success-actions">
        <Link to="/products" className="btn">Continue Shopping</Link>
        <button className="btn btn-primary" onClick={handleDownloadReceipt}>Download Receipt</button>
      </div>
    </div>
  );
}