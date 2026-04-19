import React, { useState, useEffect, useRef } from "react";

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
				Always at the cutting-edge of skin care innovation, LYMA's light-therapy Laser is quickly becoming a fixture of beauty routines the world over. Harnessing the brightening, line-smoothing and elasticity-enhancing powers of near-infrared light, the brand's iconic tool is deemed the pinnacle of time-defying tech, and the brand name is synonymous with results.
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
				<ul style={{ marginLeft: 20 }}>
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
		<div style={{ width: "100%", marginTop: 40, maxWidth: 900 }}>
			{data.map((item, idx) => (
					<div key={item.title} style={{ borderBottom: "1px solid #e0e7ef" }}>
						<button
							onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
							style={{
								width: "100%",
								textAlign: "left",
								background: "none",
								border: "none",
								outline: "none",
								fontSize: 22,
								fontWeight: 600,
								color: "#1B1B1B",
								padding: "22px 0 18px 0",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between"
							}}
						>
							{item.title}
							<span style={{ fontSize: 28, color: "rgb(229, 231, 235)", marginLeft: 12, transition: "transform 0.2s", transform: openIdx === idx ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
						</button>
					<div
						style={{
							maxHeight: openIdx === idx ? 400 : 0,
							overflow: "hidden",
							transition: "max-height 0.35s cubic-bezier(.4,0,.2,1)",
							fontSize: 17,
							color: "#222",
							padding: openIdx === idx ? "0 0 18px 0" : "0 0 0 0"
						}}
					>
						{openIdx === idx && <div>{item.content}</div>}
					</div>
				</div>
			))}
		</div>
	);
}

export default function Supplement() {
	const [activeIdx, setActiveIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const intervalRef = useRef();

	// Slider arrow handlers
	const prevImg = () => setActiveIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
	const nextImg = () => setActiveIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));

	// Auto-swipe effect
	useEffect(() => {
		if (!isPaused) {
			intervalRef.current = setInterval(() => {
				setActiveIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));
			}, 3000);
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		return () => clearInterval(intervalRef.current);
	}, [isPaused]);

	return (
		<div
			className="supplement-page"
			style={{
				minHeight: "100vh",
				background: "#fff",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "flex-start",
				fontFamily: 'Montserrat, Arial, sans-serif',
				animation: "fadeIn 0.7s"
			}}
		>
			<div
				className="supplement-container"
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 40,
					background: "#fff",
					borderRadius: 0,
					boxShadow: "none",
					padding: 0,
					maxWidth: 1200,
					width: "100%",
					alignItems: "flex-start",
					marginTop: 48,
					marginBottom: 0
				}}
			>
				{/* Gallery/Slider */}
				<div style={{ flex: 1.2, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
					<div
						style={{ position: "relative", width: 640, height: 640, background: "#fafbfc", borderRadius: 0, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: "none", border: "1px solid #e5e7eb" }}
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
					>
						<button onClick={prevImg} aria-label="Previous" style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", background: "#fff", border: "none", borderRadius: "50%", width: 44, height: 44, fontSize: 32, color: "#b6b6b6", cursor: "pointer", boxShadow: "none", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>&#8249;</button>
						<img
							src={images[activeIdx]}
							alt={`LYMA product photo ${activeIdx + 1}`}
							style={{ maxWidth: 580, maxHeight: 580, borderRadius: 0, objectFit: "contain", transition: "0.3s" }}
						/>
						<button onClick={nextImg} aria-label="Next" style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "#fff", border: "none", borderRadius: "50%", width: 44, height: 44, fontSize: 32, color: "#b6b6b6", cursor: "pointer", boxShadow: "none", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>&#8250;</button>
					</div>
					<div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 2 }}>
						{images.map((img, idx) => (
							<img
								key={img}
								src={img}
								alt={`thumb ${idx + 1}`}
								style={{
									width: 54,
									height: 54,
									borderRadius: 0,
									objectFit: "cover",
									border: idx === activeIdx ? "2px solid #222" : "2px solid #e5e7eb",
									cursor: "pointer",
									boxShadow: "none",
									transition: "border 0.2s"
								}}
								onClick={() => setActiveIdx(idx)}
							/>
						))}
					</div>
				</div>
	        {/* Product Info */}
	        <div className="supplement-info-block" style={{ flex: 1.8, minWidth: 340, paddingLeft: 40 }}>
	          <h1 className="supplement-title" style={{ fontSize: 28, fontWeight: 700, marginBottom: 10, color: "#1B1B1B", lineHeight: 1.2, letterSpacing: 0.2 }}>
	            LYMA Supplement Refills <span style={{ fontWeight: 400, color: "#222", fontSize: 18 }}>(30 Days)</span>
	          </h1>
	          <div style={{ fontSize: 22, fontWeight: 600, color: "#222", marginBottom: 10 }}>190.90€</div>
	          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
	            <button
	              className="supplement-buy-btn"
	              style={{
	                background: "#111",
	                color: "#fff",
	                fontWeight: 600,
	                fontSize: 16,
	                border: "none",
	                borderRadius: 0,
	                padding: "12px 32px",
	                cursor: "pointer",
	                boxShadow: "none",
	                transition: "background 0.2s, transform 0.2s",
	                letterSpacing: 0.5
	              }}
	              onMouseOver={e => (e.currentTarget.style.background = "#222")}
	              onMouseOut={e => (e.currentTarget.style.background = "#111")}
	            >
	              ADD TO BASKET
	            </button>
	          </div>
	          <div style={{ color: "#222", fontSize: 15, marginBottom: 18 }}>
	            <span style={{ background: "#f3f4f6", color: "#222", fontWeight: 500, borderRadius: 0, padding: "4px 12px", fontSize: 14, marginRight: 10 }}>In stock</span>
	            <span style={{ color: "#222", fontSize: 14 }}>| Usually dispatched within 24 hours</span>
	          </div>
	        </div>
	      </div>
	      {/* Accordion Sections Below */}
	      <div style={{ width: "100%", maxWidth: 1200, marginTop: 32, marginBottom: 32 }}>
	        <Accordion data={accordionData} />
	      </div>
	      {/* FadeIn Animation */}
	      <style>{`
	        @keyframes fadeIn {
	          from { opacity: 0; transform: translateY(40px); }
	          to { opacity: 1; transform: none; }
	        }
	      `}</style>
	    </div>
	  );
}