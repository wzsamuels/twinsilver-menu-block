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
import { useBlockProps, RichText, URLInputButton, InspectorControls } from '@wordpress/block-editor';
import { ToolbarGroup, ColorPicker, PanelBody, PanelRow, Button, TextControl, Placeholder  } from '@wordpress/components';
import { chevronLeft, chevronRight, Icon } from '@wordpress/icons';

import { useDispatch, useSelect } from '@wordpress/data';

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
		const newLinks = [...links, { text: 'New Link', url: '', subLinks: [] }];
		setAttributes({ links: newLinks });
	};

	const updateLink = (newText, index, type, subIndex) => {
		const newLinks = links.map((link, i) => {
			if (i === index) {
				if (typeof subIndex === 'number') {
					const newSubLinks = link.subLinks.map((subLink, j) => {
						if (j === subIndex) {
							return { ...subLink, [type]: newText };
						}
						return subLink;
					});
					return { ...link, subLinks: newSubLinks };
				}
				return { ...link, [type]: newText };
			}
			return link;
		});
		setAttributes({ links: newLinks });
	};

	const handleAddSubLink = (index) => {
		const newLinks = links.map((link, i) => {
			if (i === index) {
				const newSubLinks = [...link.subLinks, { text: 'New Sub Link', url: '' }];
				return { ...link, subLinks: newSubLinks };
			}
			return link;
		});
		setAttributes({ links: newLinks });
	};

	const handleRemoveLink = (index) => {
		const newLinks = links.filter((link, i) => i !== index);
		setAttributes({ links: newLinks });
	};

	const handleRemoveSubLink = (linkIndex, subIndex) => {
		const newLinks = links.map((link, i) => {
			if (i === linkIndex) {
				const newSubLinks = link.subLinks.filter((_, j) => j !== subIndex);
				return { ...link, subLinks: newSubLinks };
			}
			return link;
		});
		setAttributes({ links: newLinks });
	};

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
		setAttributes({ links: newLinks });
	};

	const onLinkColorChange = (newColor) => {
		setAttributes({ linkColor: newColor });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Menu Settings" initialOpen={true}>
					<PanelRow>
						<ColorPicker
							label="Link Color"
							color={linkColor}
							onChange={onLinkColorChange}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Manage Links" initialOpen={true}>
					{links?.map((link, index) => (
						<div key={index}>
							<TextControl
								label={`Link ${index + 1} Text`}
								value={link.text}
								onChange={(newText) => updateLink(newText, index, 'text')}
							/>
							<URLInputButton
								url={link.url}
								onChange={(newUrl) => updateLink(newUrl, index, 'url')}
							/>
							<Button
								onClick={() => handleRemoveLink(index)}
								isDestructive
							>
								Remove Link
							</Button>
							<Button
								onClick={() => handleShiftLink(index, 'left')}
								icon={chevronLeft}
								label="Shift Left"
							/>
							<Button
								onClick={() => handleShiftLink(index, 'right')}
								icon={chevronRight}
								label="Shift Right"
							/>
							<Button
								onClick={() => handleAddSubLink(index)}
							>
								Add Sub Link
							</Button>
							{link?.subLinks?.map((subLink, subIndex) => (
								<div key={subIndex} style={{ marginLeft: '20px' }}>
									<TextControl
										label={`Sub Link ${subIndex + 1} Text`}
										value={subLink.text}
										onChange={(text) => updateLink(text, index, 'text', subIndex)}
									/>
									<URLInputButton
										url={subLink.url}
										onChange={(url) => updateLink(url, index, 'url', subIndex)}
									/>
									<Button
										onClick={() => handleRemoveSubLink(index, subIndex)}
										isDestructive
									>
										Remove Sub Link
									</Button>
								</div>
							))}
						</div>
					))}
					<Button
						onClick={handleAddLink}
						variant='primary'
					>
						Add Link
					</Button>
				</PanelBody>
			</InspectorControls>
			<div className='flex'>
				{ links.length === 0 &&
					<Placeholder label='TS Menu Block'/>
				}
				{links?.map((link, index) => (
					<div key={index} className="link-item px-4 py-2 mx-1 relative">
						<RichText
							tagName="div"
							value={link.text}
							onChange={(newText) => updateLink(newText, index, 'text')}
							placeholder="Link text"
						/>
						{link?.subLinks?.map((subLink, subIndex) => (
							<div key={subIndex}>
								<RichText
									tagName="p"
									value={subLink.text}
									onChange={(text) => updateLink(text, index, 'text', subIndex)}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
