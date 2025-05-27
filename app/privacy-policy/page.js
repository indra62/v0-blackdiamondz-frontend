import Footer from "@/components/footer"
import { Taviraj, Archivo } from "next/font/google"

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-taviraj",
})

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
})

export default function PrivacyPolicy() {
  return (
		<main className="bg-[#211f17] min-h-screen">
			<div className="container mx-auto px-4 py-16">
				{/* Privacy Policy Header */}
				<div className="text-center mb-12">
					<h1
						className={`${taviraj.className} text-[#E2DBCC] text-5xl font-light mb-6`}
					>
						Privacy Policy
					</h1>

					{/* Decorative Divider */}
					<div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto">
						<div className="h-px bg-[#656565]/30 flex-grow"></div>
						<div className="w-2 h-2 bg-[#BD9574] rotate-45"></div>
						<div className="h-px bg-[#656565]/30 flex-grow"></div>
					</div>
				</div>

				{/* Introduction */}
				<div
					className={`${archivo.className} text-[#E2DBCC] text-center max-w-3xl mx-auto mb-16`}
				>
					<p className="mb-4">
						If you require any more information or have any questions about our
						privacy policy, please feel free to contact us by email at
						[ask@blackdiamondz.com]
					</p>
					<p>
						At www.blackdiamondz.com we consider the privacy of our visitors to
						be extremely important. This privacy policy document describes in
						detail the types of personal information is collected and recorded
						by www.blackdiamondz.com and how we use it.
					</p>
				</div>

				{/* Policy Sections - Two Column Layout */}
				<div className="max-w-4xl mx-auto">
					{/* Log Files */}
					<section className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-y-8 gap-x-4 mb-12">
						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Log Files
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p>
								Like many other Web sites, www.blackdiamondz.com makes use of
								log files. These files merely logs visitors to the site –
								usually a standard procedure for hosting companies and a part of
								hosting service's analytics. The information inside the log
								files includes internet protocol (IP) addresses, browser type,
								Internet Service Provider (ISP), date/time stamp, referring/exit
								pages, and possibly the number of clicks. This information is
								used to analyse trends, administer the site, track user's
								movement around the site, and gather demographic information. IP
								addresses, and other such information are not linked to any
								information that is personally identifiable.
							</p>
						</div>

						{/* Cookies and Web Beacons */}
						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Cookies and Web Beacons
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p>
								www.blackdiamondz.com uses cookies to store information about
								visitors' preferences, to record user-specific information on
								which pages the site visitor accesses or visits, and to
								personalize or customize our web page content based upon
								visitors' browser type or other information that the visitor
								sends via their browser.
							</p>
						</div>

						{/* DoubleClick DART Cookie */}
						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							DoubleClick DART Cookie
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									Google, as a third party vendor, uses cookies to serve ads on
									www.blackdiamondz.com.
								</li>
								<li>
									Google's use of the DART cookie enables it to serve ads to our
									site's visitors based upon their visit to
									www.blackdiamondz.com and other sites on the Internet.
								</li>
								<li>
									Users may opt out of the use of the DART cookie by visiting
									the Google ad and content network privacy policy at the
									following URL –{" "}
									<a
										className="underline text-[#BD9574]"
										href="http://www.google.com/privacy_ads.html"
									>
										click here
									</a>
								</li>
							</ul>
						</div>

						{/* Our Advertising Partners */}

						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Our Advertising Partners
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p className="mb-4">
								Some of our advertising partners may use cookies and web beacons
								on our site. Our advertising partners include...
							</p>
							<ul className="list-disc pl-6 space-y-2 mb-4">
								<li>Google</li>
								<li>Amazon</li>
							</ul>
							<p className="mb-4">
								You may consult this listing to find the privacy policy for each
								of the advertising partners of www.blackdiamondz.com.
							</p>
							<p className="mb-4">
								These third-party ad servers or ad networks use technology in
								their respective advertisements and links that appear on
								www.blackdiamondz.com and which are sent directly to your
								browser. They automatically receive your IP address when this
								occurs. Other technologies (such as cookies, JavaScript, or Web
								Beacons) may also be used by our site's third-party ad networks
								to measure the effectiveness of their advertising campaigns
								and/or to personalize the advertising content that you see on
								the site.
							</p>
							<p>
								www.blackdiamondz.com has no access to or control over these
								cookies that are used by third-party advertisers.
							</p>
						</div>

						{/* Third Party Privacy Policies */}

						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Third Party Privacy Policies
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p className="mb-4">
								You should consult the respective privacy policies of these
								third-party ad servers for more detailed information on their
								practices as well as for instructions about how to opt-out of
								certain practices. www.blackdiamondz.com's privacy policy does
								not apply to, and we cannot control the activities of, such
								other advertisers or web sites.
							</p>
							<p>
								If you wish to disable cookies, you may do so through your
								individual browser options. More detailed information about
								cookie management with specific web browsers can be found at the
								browsers' respective websites.
							</p>
						</div>

						{/* Children's Information */}

						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Children's Information
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p className="mb-4">
								We believe it is important to provide added protection for
								children online. We encourage parents and guardians to spend
								time online with their children to observe, participate in and/
								or monitor and guide their online activity.
							</p>
							<p>
								www.blackdiamondz.com does not knowingly collect any personally
								identifiable information from children under the age of 13. If a
								parent or guardian believes that www.blackdiamondz.com has in
								its database the personally-identifiable information of a child
								under the age of 13, please contact us immediately (using the
								contact in the first paragraph) and we will use our best efforts
								to promptly remove such information from our records.
							</p>
						</div>

						{/* Online Privacy Policy Only */}

						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Online Privacy Policy Only
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p className="mb-4">
								This privacy policy applies only to our online activities and is
								valid for visitors to our website and regarding information
								shared and/or collected there.
							</p>
							<p>
								This policy does not apply to any information collected offline
								or via channels other than this website.
							</p>
						</div>

						{/* Consent */}

						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Consent
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p>
								By using our website, you hereby consent to our privacy policy
								and agree to its terms.
							</p>
						</div>

						{/* Update */}

						<h2
							className={`${taviraj.className} text-[#BD9574] text-2xl font-light p-4`}
						>
							Update
						</h2>
						<div
							className={`${archivo.className} text-[#E2DBCC] font-light md:col-span-3 p-4`}
						>
							<p>
								This Privacy Policy was last updated on: Dec 1st, 2022. Should
								we update, amend or make any changes to our privacy policy,
								those changes will be posted here.
							</p>
						</div>
					</section>
				</div>
			</div>

			<Footer />
		</main>
	);
}
