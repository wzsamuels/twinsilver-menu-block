/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, URLInputButton, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { ToolbarGroup, ColorPicker, PanelBody } from '@wordpress/components'
import { chevronLeft, chevronRight, Icon } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { links, linkColor } = attributes;

	if (!links) {
		setAttributes({ links: [] });
	}

	const handleAddLink = () => {
		const newLinks = [...links, { text: 'New Link', url: '' }];
		setAttributes({ links: newLinks });
	};

	const handleRemoveLink = (index) => {
		const newLinks = links.filter((link, i) => i !== index)
		setAttributes({links: newLinks})
	}

	const handleShiftLink = (index, direction) => {
		const newLinks = [...links];
		if (direction === 'right') {
			if (index < newLinks.length - 1) {
					let temp = newLinks[index];
					newLinks[index] = newLinks[index + 1];
					newLinks[index + 1] = temp;
			}
		} else if (direction === 'left') {
				if (index > 0) {
						let temp = newLinks[index];
						newLinks[index] = newLinks[index - 1];
						newLinks[index - 1] = temp;
				}
		}
		setAttributes({links: newLinks})
	}

	const updateLink = (newText, index, type) => {
			const newLinks = links.map((link, i) => {
					if (i === index) {
							return { ...link, [type]: newText };
					}
					return link;
			});
			setAttributes({ links: newLinks });
	};

	const onLinkColorChange = (newColor) => {
		setAttributes({ linkColor: newColor });
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Menu Settings" initialOpen={true}>
					Responsive Breakpoint
					<ColorPicker
						label="Link Color"
						color={linkColor}
						onChange={onLinkColorChange}
					/>
				</PanelBody>
			</InspectorControls>			
			<button
				className="lg:hidden px-4 py-2">
			&#9776; {/* Hamburger Icon */}
		</button>
		<div className='hidden lg:flex'>
			{links.map((link, index) => (
				<div key={index} className="link-item px-4 py-2 mx-1 relative">
					<RichText
							tagName="div"
							value={link.text}
							onChange={(newText) => updateLink(newText, index, 'text')}
							placeholder="Link text"
					/>
					<div className="absolute bottom-[-1em] left-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white border border-black z-50">
						<button><Icon icon={chevronLeft} onClick={() => handleShiftLink(index, "left")}/></button>
						<button><Icon icon={chevronRight} onClick={() => handleShiftLink(index, "right")}/></button>
						<URLInputButton
								url={link.url}
								onChange={(newUrl) => updateLink(newUrl, index, 'url')}
						/>
						<button onClick={() => handleRemoveLink(index)} className="components-button is-secondary">
							Remove Link
						</button>
					</div>
				</div>
		))}
			<button onClick={handleAddLink} className="components-button is-secondary">
					Add Link
			</button>
		</div>
	
		</div>
	);
}
