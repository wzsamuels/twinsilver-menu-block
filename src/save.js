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
	const { links } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div className='hidden lg:flex'>
				{links.map((item, index) =>
					<a key={item.text}
						className={`no-underline px-4 py-2 mx-1 relative after:transition after:absolute after:w-full after:right-1/2
											after:translate-x-[0%] after:hover:h-[2px] after:top-[100%] after:left-0 after:hover:bg-black after:h-[2px]`}
							href={item.url}>
							{item.text}
					</a>
				)}
			</div>
			<button className="hamburger-button lg:hidden px-4 py-2">
				&#9776; {/* Hamburger Icon */}
			</button>
			<div className='menu-sidebar fixed bg-white top-0 w-52 flex flex-col'>
				<div className='w-full flex justify-between' style={{justifyContent: "space-between"}}>
					<p className='px-4 py-6'>DeCicco Woodshop</p>					
					<button className="sidebar-close-button px-4 py-2">
							&#9776; {/* Hamburger Icon */}
						</button>
				</div>
				{links.map((link, index) =>
					<div key={index} className={'my-4 py-2 px-4'}>
						<a 
								className={`no-underline px-4 py-2 mx-1 relative after:transition after:absolute after:w-full after:right-1/2
													after:translate-x-[0%] after:hover:h-[2px] after:top-[100%] after:left-0 after:hover:bg-black after:h-[2px]`}
									href={link.url}>
									{link.text}
								</a>
					</div>
				)}
			</div>
		</div>
	);
}
