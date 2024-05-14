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
import { ToolbarGroup, AlignmentToolbar, PanelBody } from '@wordpress/components'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { links } = attributes;
	if (!links) {
			setAttributes({ links: [] });
	}

	const blockProps = useBlockProps();

	const handleAddLink = () => {
			const newLinks = [...links, { text: 'New Link', url: '' }];
			setAttributes({ links: newLinks });
	};

	const updateLink = (newText, index, type) => {
			const newLinks = links.map((link, i) => {
					if (i === index) {
							return { ...link, [type]: newText };
					}
					return link;
			});
			setAttributes({ links: newLinks });
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Menu Settings" initialOpen={true}>
					Responsive Breakpoint
				</PanelBody>
			</InspectorControls>			
			<button
				className="lg:hidden px-4 py-2">
			&#9776; {/* Hamburger Icon */}
		</button>n
		<div className='hidden lg:flex'>
			{links.map((link, index) => (
				<div key={index} className="link-item px-4 py-2 mx-1">
					<RichText
							tagName="div"
							value={link.text}
							onChange={(newText) => updateLink(newText, index, 'text')}
							placeholder="Link text"
					/>
					<URLInputButton
							url={link.url}
							onChange={(newUrl) => updateLink(newUrl, index, 'url')}
					/>
				</div>
		))}
		<button onClick={handleAddLink} className="components-button is-secondary">
				Add Link
		</button>
		</div>
	
		</div>
	);
}
