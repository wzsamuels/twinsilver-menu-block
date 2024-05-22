import MenuLink from './menuLink';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { links, linkColor } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div className='hidden lg:flex'>
				{links.map((link, index) => (
					<div key={index} className="menu-item relative group">
						<MenuLink 
							className={`menu-link ${link.subLinks.length > 0 ? 'has-submenu' : ''}`}
							href={link.url}
							style={{ '--hover-after-bg-color': `${linkColor}` }}
						>
							{link.text}
						</MenuLink>
						{link.subLinks.length > 0 && (
							<ul className='hidden lg:group-hover:block absolute bg-white shadow-md'>
								{link.subLinks.map((subLink, subIndex) => (
									<li key={subIndex} className="submenu-item">
										<MenuLink className="submenu-link" href={subLink.url}>
											{subLink.text}
										</MenuLink>
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
			<button className="hamburger-button lg:hidden px-4 py-2">
				&#9776; {/* Hamburger Icon */}
			</button>
			<div className='menu-sidebar fixed bg-white top-0 w-52 flex flex-col'>
				<div className='w-full flex justify-between' style={{ justifyContent: "space-between" }}>
					<p className='px-4 py-6'>DeCicco Woodshop</p>					
					<button className="sidebar-close-button cursor-pointer px-4 py-2">
						&#9776; {/* Close Icon */}
					</button>
				</div>
				{links.map((link, index) => (
					<div key={index} className="menu-item my-4 py-2 px-4">
						<MenuLink 
							className="menu-link" 
							href={link.url}
							style={{ '--hover-after-bg-color': `${linkColor}` }}
						>
							{link.text}
						</MenuLink>
						{link.subLinks.length > 0 && (
							<ul className=''>
								{link.subLinks.map((subLink, subIndex) => (
									<li key={subIndex} className="submenu-item">
										<a className="submenu-link" href={subLink.url}>
											{subLink.text}
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
