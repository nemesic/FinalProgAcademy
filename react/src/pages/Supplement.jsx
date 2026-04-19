
import React from "react";

export default function Supplement() {
	return (
		<div className="supplement-page">
			<div className="supplement-container">
				<div className="supplement-image-block">
					<img
						src="/img/supplement-product.png"
						alt="LYMA Supplement Refills"
						className="supplement-image"
					/>
				</div>
				<div className="supplement-info-block">
					<h1 className="supplement-title">LYMA Supplement Refills (30 Days)</h1>
					<div className="supplement-desc">
						<p>
							The LYMA Supplement is a next-generation nutraceutical, formulated with nine patented, peer-reviewed ingredients at proven dosages. Each refill pack contains a 30-day supply of the world’s most advanced supplement, designed to support immunity, energy, sleep, skin, and overall wellbeing.
						</p>
						<ul>
							<li>30-day supply (120 capsules)</li>
							<li>Vegan, gluten-free, non-GMO</li>
							<li>Formulated with patented, clinically proven ingredients</li>
							<li>Free from fillers, dyes, and preservatives</li>
						</ul>
					</div>
					<div className="supplement-purchase-row">
						<span className="supplement-price">£149.00</span>
						<button className="supplement-buy-btn">BUY NOW</button>
					</div>
				</div>
			</div>
		</div>
	);
}
