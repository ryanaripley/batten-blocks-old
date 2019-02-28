/**
 * BLOCK: Batten Quotation
 *
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'batten-blocks/batten-quotation', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Batten Quotation' ), // Block title.
	icon: 'format-quote', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Quote' ),
		__( 'Quotation' ),
	],
	attributes: {
		quotation: {
			type: 'array',
			source: 'children',
			selector: '.batten-quotation'
		},
		citation: {
			type: 'array',
			source: 'children',
			selector: '.batten-citation'
		},
		backgroundImage: {
			type: 'string',
			default: 'radial-gradient(ellipse at top, #494949 1%,#2b2b2b 100%)',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const { 
			className,
			attributes: {
				quotation,
				citation,
				backgroundImage,
			},
			setAttributes,
		} = props;
		const onChangeQuotation = ( value ) => {
			setAttributes( { quotation: value } );
		};
		const onChangeCitation = ( value ) => {
			setAttributes( { citation: value } );
		};
		const onSelectImage = ( imageObject ) => {
			setAttributes( { backgroundImage: imageObject.sizes.full.url	} );
		};
		// Creates a <p class='wp-block-cgb-block-batten-blocks'></p>.
		return (
			<div className={ className } style={{ backgroundImage: `url(${ backgroundImage })` }}>
				<blockquote>
					<RichText
						className="batten-quotation"
						tagName="p"
						placeholder={ __( 'Add quotation here', 'batten-blocks' )}
						value={ quotation }
						onChange={ onChangeQuotation }
					/>
					<footer>
						<RichText
							className="batten-citation"
							tagName="cite"
							placeholder={ __( 'Add citation here', 'batten-blocks' )}
							value={ citation }
							onChange={ onChangeCitation }
					/>
					</footer>
				</blockquote>

				<div className="background-image-button">
					<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes="image"
							value={ backgroundImage }
							title={ __('Add a background image.', 'batten-blocks') }
							render={ ( { open } ) => (
								<Button className="button button-large" onClick={ open }>
									{ backgroundImage ? __('Change background', 'batten-blocks') : __('Add background', 'batten-blocks')}
								</Button>
							) }
						/>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const {
			className,
			attributes: {
				quotation,
				citation,
				backgroundImage,
			},
		} = props;
		return (
			<div className={ className } style={{ backgroundImage: `url(${ backgroundImage })` }} >
				<blockquote>
					<RichText.Content tagName="p" className="batten-quotation" value={ quotation } />
					<footer>
						<RichText.Content tagName="cite" className="batten-citation" value={ citation } />
					</footer>
				</blockquote>
			</div>
		);
	},
} );
