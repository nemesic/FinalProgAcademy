import React, { useState, useRef, useEffect } from "react";

const images = [
	"/img/1.avif",
	"/img/2.avif",
	"/img/3.avif",
	"/img/4.avif",
	"/img/5.avif",
	"/img/6.avif",
	"/img/7.avif"
];

const accordionData = [
	{
		title: "Why It's Cult",
		content: (
			<>
				Always at the cutting-edge of skin care innovation, LYMA's light-therapy Supplement is quickly becoming a fixture of beauty routines the world over. Harnessing the brightening, line-smoothing and elasticity-enhancing powers of near-infrared light, the brand's iconic tool is deemed the pinnacle of time-defying tech, and the brand name is synonymous with results.
			</>
		)
	},
	{
		title: "Description",
		content: (
			<>
				The LYMA Supplement is a next-generation nutraceutical, formulated with nine patented, peer-reviewed ingredients at proven dosages. Each refill pack contains a 30-day supply of the world’s most advanced supplement, designed to support immunity, energy, sleep, skin, and overall wellbeing.
			</>
		)
	},
	{
		title: "Ingredients",
		content: (
			<>
				<ul className="product-feature-list">
					<li>30-day supply (120 capsules)</li>
					<li>Vegan, gluten-free, non-GMO</li>
					<li>Formulated with patented, clinically proven ingredients</li>
					<li>Free from fillers, dyes, and preservatives</li>
				</ul>
			</>
		)
	},
	{
		title: "How to use",
		content: (
			<>
				Take four capsules daily, preferably with food. For best results, use consistently as part of your daily routine.
			</>
		)
	},
	{
		title: "Compliance Warnings",
		content: (
			<>
				Consult your healthcare provider before use if you are pregnant, nursing, taking medication, or have a medical condition. Keep out of reach of children.
			</>
		)
	},
	{
		title: "Postal Address",
		content: (
			<>
				LYMA Life Ltd, 123 Wellness Avenue, London, UK
			</>
		)
	},
	{
		title: "Electronic Address",
		content: (
			<>
				support@lyma.life
			</>
		)
	}
];

function Accordion({ data }) {
	const [openIdx, setOpenIdx] = useState(null);
	return (
		<div className="product-accordion supplement-accordion">
			{data.map((item, idx) => (
				<div key={item.title} className="product-accordion-section">
					<button
						onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
						className="product-accordion-btn"
					>
						{item.title}
						<span className={`product-accordion-arrow${openIdx === idx ? " product-accordion-arrow-open" : ""}`}>›</span>
					</button>
					<div className={`product-accordion-content${openIdx === idx ? " product-accordion-content-open" : ""}`}>
						{openIdx === idx && <div>{item.content}</div>}
					</div>
				</div>
			))}
		</div>
	);
}

export default function Supplement() {
	const [activeIdx, setActiveIdx] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [toast, setToast] = useState("");
	const toastTimeout = useRef();

	const prevImg = () => setActiveIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
	const nextImg = () => setActiveIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));

	useEffect(() => {
		if (toast) {
			toastTimeout.current = setTimeout(() => setToast(""), 1800);
		}
		return () => clearTimeout(toastTimeout.current);
	}, [toast]);

	function handleAddToCart() {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		const product = {
			id: "supplement-lyma",
			name: "LYMA Supplement Refills (30 Days)",
			type: "Supplement",
			price: 190.90,
			quantity,
			img: images[activeIdx]
		};
		const idx = cart.findIndex(item => item.id === product.id);
		if (idx > -1) {
			cart[idx].quantity = (Number(cart[idx].quantity) || 0) + quantity;
		} else {
			cart.push(product);
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		setToast("Added to basket!");
	}

	return (
		<div className="supplement-page">
			{/* Gallery/Slider */}
			<div className="product-layout">
				<div className="product-gallery-column">
					<div className="product-gallery-frame">
						<button onClick={prevImg} aria-label="Previous" className="product-nav-btn product-nav-btn-left">&#8249;</button>
						<img src={images[activeIdx]} alt={`LYMA product photo ${activeIdx + 1}`} className="product-image" />
						<button onClick={nextImg} aria-label="Next" className="product-nav-btn product-nav-btn-right">&#8250;</button>
					</div>
					<div className="product-thumbs">
						{images.map((img, idx) => (
							<img
								key={img}
								src={img}
								alt={`thumb ${idx + 1}`}
								className={`supplement-thumb${idx === activeIdx ? " supplement-thumb-active" : ""}`}
								onClick={() => setActiveIdx(idx)}
							/>
						))}
					</div>
				</div>
				{/* Product Info */}
				<div className="product-info-block">
					<h1 className="product-title-heading">
						LYMA Supplement Refills <span className="supplement-title-sub">(30 Days)</span>
					</h1>
					<div className="product-price-text">190.90₴</div>
					<div className="product-purchase-row">
						<button
							className="product-qty-btn"
							onClick={() => setQuantity(q => Math.max(1, q - 1))}
							aria-label="Decrease quantity"
						>
							–
						</button>
						<span className="product-qty-value">x{quantity}</span>
						<button
							className="product-qty-btn"
							onClick={() => setQuantity(q => q + 1)}
							aria-label="Increase quantity"
						>
							+
						</button>
						<button className="product-add-btn" onClick={handleAddToCart}>
							ADD TO BASKET
						</button>
					</div>
					<div className="product-status">
						<span className="product-status-badge">In stock</span>
						<span className="product-status-text">| Usually dispatched within 24 hours</span>
					</div>
				</div>
			</div>
			{toast && <div className="page-toast">{toast}</div>}
			{/* Accordion Sections Below */}
			<div className="product-accordion-wrapper">
				<Accordion data={accordionData} />
			</div>
		</div>
	);
}