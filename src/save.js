import MenuLink from './menuLink';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */


export default function save({attributes}) {
	const { links, linkColor } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div className='hidden lg:flex'>
				{links.map((item, index) =>
					<MenuLink key={item.text}						
						href={item.url}
						style={{'--hover-after-bg-color': `${linkColor}`}}
					>
						{item.text}
					</MenuLink>
				)}
			</div>
			<button className="hamburger-button lg:hidden px-4 py-2">
				&#9776; {/* Hamburger Icon */}
			</button>
			<div className='menu-sidebar fixed bg-white top-0 w-52 flex flex-col'>
				<div className='w-full flex justify-between' style={{justifyContent: "space-between"}}>
					<p className='px-4 py-6'>DeCicco Woodshop</p>					
					<button className="sidebar-close-button cursor-pointer px-4 py-2">
							&#9776; {/* Hamburger Icon */}
						</button>
				</div>
				{links.map((link, index) =>
					<div key={index} className={'my-4 py-2 px-4'}>
						<MenuLink href={link.url}
							style={{'--hover-after-bg-color': `${linkColor}`}}
						>
							{link.text}
						</MenuLink>
					</div>
				)}
			</div>
		</div>
	);
}
