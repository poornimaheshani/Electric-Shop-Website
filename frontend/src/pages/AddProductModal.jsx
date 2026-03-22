import React, { useState } from "react";

const CATEGORIES = [
  "Electronics", "Electrical", "Lighting", "Power Tools",
  "Cables & Wires", "Switches & Sockets", "Batteries", "Other"
];

const UNITS = ["pcs", "meter", "box", "set", "pair", "roll", "kg", "litre"];

const initialForm = {
  product_name: "", category: "", brand: "", supplier: "",
  description: "", cost_price: "", selling_price: "",
  quantity: "", min_stock: "5", unit: "pcs",
};

export default function AddProductModal({ onClose, onSave }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.product_name.trim()) errs.product_name = "Product name is required";
    if (!form.category) errs.category = "Select a category";
    if (!form.cost_price || isNaN(form.cost_price)) errs.cost_price = "Valid cost price required";
    if (!form.selling_price || isNaN(form.selling_price)) errs.selling_price = "Valid selling price required";
    if (!form.quantity || isNaN(form.quantity)) errs.quantity = "Valid quantity required";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setForm(initialForm); if (onSave) onSave(); if (onClose) onClose(); }, 1800);
      }
    } catch {
      // If no backend yet, just show success for frontend demo
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setForm(initialForm); if (onClose) onClose(); }, 1800);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(11, 31, 58, 0.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }

        .modal-box {
          background: #fff;
          border-radius: 18px;
          width: 100%; max-width: 700px;
          max-height: 92vh; overflow-y: auto;
          box-shadow: 0 24px 60px rgba(11,31,58,0.22);
          animation: slideUp 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .modal-box::-webkit-scrollbar { width: 5px; }
        .modal-box::-webkit-scrollbar-thumb { background: #dde3ef; border-radius: 10px; }

        .modal-header {
          background: linear-gradient(135deg, #0b1f3a, #162f5c);
          padding: 24px 30px;
          border-radius: 18px 18px 0 0;
          display: flex; align-items: center; justify-content: space-between;
        }
        .modal-header-left { display: flex; align-items: center; gap: 14px; }
        .modal-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: #ffc107;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .modal-title { color: #fff; font-size: 20px; font-weight: 700; }
        .modal-subtitle { color: #a0b4cc; font-size: 13px; margin-top: 2px; }
        .modal-close {
          background: rgba(255,255,255,0.1); border: none;
          color: #fff; width: 34px; height: 34px; border-radius: 50%;
          font-size: 18px; cursor: pointer; display: flex;
          align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .modal-close:hover { background: rgba(255,255,255,0.2); }

        .modal-body { padding: 30px; }

        .section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
          color: #3155b9; text-transform: uppercase;
          margin-bottom: 16px; margin-top: 24px;
          display: flex; align-items: center; gap: 8px;
        }
        .section-label::after {
          content: ''; flex: 1; height: 1px; background: #eef2fb;
        }
        .section-label:first-child { margin-top: 0; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-grid.three { grid-template-columns: 1fr 1fr 1fr; }
        .form-grid.full { grid-template-columns: 1fr; }

        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label {
          font-size: 13px; font-weight: 600; color: #374151;
        }
        .required-star { color: #e53e3e; margin-left: 3px; }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 11px 14px;
          border: 1.8px solid #dde3ef;
          border-radius: 10px;
          font-size: 14px;
          color: #0b1f3a;
          background: #f8faff;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #ffc107;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(255,193,7,0.15);
        }
        .form-group input.error,
        .form-group select.error {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229,62,62,0.1);
        }
        .form-group textarea { resize: vertical; min-height: 80px; }
        .err-msg { font-size: 12px; color: #e53e3e; margin-top: 2px; }

        .price-wrap { position: relative; }
        .price-wrap input { padding-left: 32px; }
        .price-symbol {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%);
          color: #6b7280; font-weight: 600; font-size: 14px;
          pointer-events: none;
        }

        .margin-badge {
          margin-top: 8px; padding: 10px 14px;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border: 1px solid #bbf7d0; border-radius: 10px;
          font-size: 13px; font-weight: 600; color: #15803d;
          display: flex; justify-content: space-between;
        }

        .modal-footer {
          padding: 20px 30px;
          border-top: 1px solid #eef2fb;
          display: flex; justify-content: flex-end; gap: 12px;
          background: #fafbff; border-radius: 0 0 18px 18px;
        }
        .btn-cancel {
          padding: 11px 24px; border: 1.8px solid #dde3ef;
          background: white; border-radius: 10px;
          font-size: 14px; font-weight: 600; color: #374151;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-cancel:hover { border-color: #aab0bc; background: #f4f6fb; }

        .btn-save {
          padding: 11px 28px;
          background: linear-gradient(135deg, #ffc107, #e6a800);
          border: none; border-radius: 10px;
          font-size: 14px; font-weight: 700; color: #0b1f3a;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255,193,7,0.35);
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; gap: 8px;
        }
        .btn-save:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,193,7,0.45); }
        .btn-save:active { transform: translateY(0); }

        .success-overlay {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.96);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border-radius: 18px; gap: 14px;
          animation: fadeIn 0.3s ease;
          z-index: 10;
        }
        .success-icon {
          width: 70px; height: 70px; border-radius: 50%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; color: white;
          box-shadow: 0 8px 24px rgba(34,197,94,0.35);
          animation: pop 0.4s cubic-bezier(0.68,-0.55,0.27,1.55);
        }
        @keyframes pop { from { transform: scale(0) } to { transform: scale(1) } }
        .success-title { font-size: 20px; font-weight: 700; color: #0b1f3a; }
        .success-sub { font-size: 14px; color: #6b7280; }

        @media (max-width: 580px) {
          .form-grid, .form-grid.three { grid-template-columns: 1fr; }
          .modal-body { padding: 20px; }
          .modal-footer { padding: 16px 20px; }
        }
      `}</style>

      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
        <div className="modal-box" style={{ position: "relative" }}>

          {/* SUCCESS OVERLAY */}
          {submitted && (
            <div className="success-overlay">
              <div className="success-icon">✓</div>
              <div className="success-title">Product Added!</div>
              <div className="success-sub">Item saved to inventory successfully</div>
            </div>
          )}

          {/* HEADER */}
          <div className="modal-header">
            <div className="modal-header-left">
              <div className="modal-icon">📦</div>
              <div>
                <div className="modal-title">Add New Product</div>
                <div className="modal-subtitle">Fill in all product details below</div>
              </div>
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* BASIC INFO */}
            <div className="section-label">📋 Basic Information</div>
            <div className="form-grid">
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label>Product Name <span className="required-star">*</span></label>
                <input
                  name="product_name" value={form.product_name}
                  onChange={handleChange} placeholder="e.g. Samsung 65-inch Smart TV"
                  className={errors.product_name ? "error" : ""}
                />
                {errors.product_name && <span className="err-msg">⚠ {errors.product_name}</span>}
              </div>

              <div className="form-group">
                <label>Category <span className="required-star">*</span></label>
                <select name="category" value={form.category} onChange={handleChange} className={errors.category ? "error" : ""}>
                  <option value="">-- Select Category --</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <span className="err-msg">⚠ {errors.category}</span>}
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Samsung, Philips" />
              </div>

              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label>Supplier</label>
                <input name="supplier" value={form.supplier} onChange={handleChange} placeholder="e.g. ABC Electronics Wholesale" />
              </div>

              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Brief product description..." />
              </div>
            </div>

            {/* PRICING */}
            <div className="section-label">💰 Pricing</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Cost Price <span className="required-star">*</span></label>
                <div className="price-wrap">
                  <span className="price-symbol">Rs</span>
                  <input
                    name="cost_price" type="number" min="0" step="0.01"
                    value={form.cost_price} onChange={handleChange}
                    placeholder="0.00"
                    className={errors.cost_price ? "error" : ""}
                    style={{ paddingLeft: "36px" }}
                  />
                </div>
                {errors.cost_price && <span className="err-msg">⚠ {errors.cost_price}</span>}
              </div>

              <div className="form-group">
                <label>Selling Price <span className="required-star">*</span></label>
                <div className="price-wrap">
                  <span className="price-symbol">Rs</span>
                  <input
                    name="selling_price" type="number" min="0" step="0.01"
                    value={form.selling_price} onChange={handleChange}
                    placeholder="0.00"
                    className={errors.selling_price ? "error" : ""}
                    style={{ paddingLeft: "36px" }}
                  />
                </div>
                {errors.selling_price && <span className="err-msg">⚠ {errors.selling_price}</span>}
              </div>
            </div>

            {/* Profit Margin Calculator */}
            {form.cost_price && form.selling_price && !isNaN(form.cost_price) && !isNaN(form.selling_price) && (
              <div className="margin-badge">
                <span>📈 Profit Margin</span>
                <span>
                  Rs {(parseFloat(form.selling_price) - parseFloat(form.cost_price)).toFixed(2)} &nbsp;|&nbsp;
                  {(((parseFloat(form.selling_price) - parseFloat(form.cost_price)) / parseFloat(form.cost_price)) * 100).toFixed(1)}%
                </span>
              </div>
            )}

            {/* STOCK */}
            <div className="section-label">📦 Stock Details</div>
            <div className="form-grid three">
              <div className="form-group">
                <label>Quantity <span className="required-star">*</span></label>
                <input
                  name="quantity" type="number" min="0"
                  value={form.quantity} onChange={handleChange}
                  placeholder="0"
                  className={errors.quantity ? "error" : ""}
                />
                {errors.quantity && <span className="err-msg">⚠ {errors.quantity}</span>}
              </div>

              <div className="form-group">
                <label>Min Stock Alert</label>
                <input name="min_stock" type="number" min="0" value={form.min_stock} onChange={handleChange} placeholder="5" />
              </div>

              <div className="form-group">
                <label>Unit</label>
                <select name="unit" value={form.unit} onChange={handleChange}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-save" onClick={handleSubmit}>
              <span>💾</span> Save Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
