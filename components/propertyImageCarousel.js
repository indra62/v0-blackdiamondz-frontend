import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

const responsive = {
	desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
	tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
	mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function CustomDiamondDot({ onClick, ...rest }) {
	const { index, active } = rest;
	return (
		<div
			key={index}
			className={`w-2 h-2 mx-1 mb-3 ${
				active ? "bg-[#BD9574]" : "bg-[#656565]"
			} transform rotate-45 cursor-pointer transition-colors`}
			onClick={onClick}
		/>
	);
}

export default function PropertyImagesCarousel({
	images = [],
	alt,
	detailUrl,
	taviraj,
	archivo,
  count,
}) {
	if (!images.length) {
		return (
			<div className="relative h-[240px] bg-gray-200">
				<Image
					src="/placeholder-image.png"
					alt={alt}
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
		);
	}

	return (
		<Carousel
			responsive={responsive}
			swipeable
			draggable
			showDots
			arrows
			customDot={<CustomDiamondDot />}
			infinite={false}
			removeArrowOnDeviceType={["tablet", "mobile"]}
			containerClass="carousel-container"
			itemClass="carousel-item"
		>
			{images.map((img, idx) =>
				typeof img === "string" ? (
					<div key={idx} className="relative h-[240px]">
						<Image
							src={img}
							alt={alt}
							fill
							style={{ objectFit: "cover" }}
							className="transition-transform duration-700 hover:scale-110"
						/>
					</div>
				) : img.seeAll ? (
					<Link
						key={idx}
						href={detailUrl}
						className="relative h-[240px] block group"
						tabIndex={0}
					>
						<Image
							src={img.url}
							alt={alt}
							fill
							style={{ objectFit: "cover", filter: "brightness(0.7)" }}
							className="transition-transform duration-700 group-hover:scale-110"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<span
								className={`${archivo.className} bg-black bg-opacity-60 text-white px-4 py-2 rounded text-lg font-semibold`}
							>
								{`See all ${count} photos`}
							</span>
						</div>
					</Link>
				) : null
			)}
		</Carousel>
	);
}