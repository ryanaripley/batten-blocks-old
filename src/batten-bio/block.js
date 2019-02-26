/**
 * BLOCK: Batten Bio
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
registerBlockType( 'batten-blocks/batten-bio', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Batten Bio' ), // Block title.
	icon: 'admin-users', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bio' ),
		__( 'Biography' ),
		__( 'About me' ),
	],
	attributes: {
		name: {
			type: 'array',
			source: 'children',
			selector: '.bio-name'
		},
		title: {
			type: 'array',
			source: 'children',
			selector: '.bio-subtitle'
		},
		bio: {
			type: 'array',
			source: 'children',
			selector: '.bio-paragraph'
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
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
				name,
				title,
				bio,
				mediaID,
				mediaURL
			},
			setAttributes,
		} = props;
		const onChangeName = ( value ) => {
			setAttributes( { name: value } );
		};
		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};
		const onChangeBio = ( value ) => {
			setAttributes( { bio: value } );
		};
		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		// Creates a <p class='wp-block-cgb-block-batten-blocks'></p>.
		return (
			<div className={ className }>
				<div className="bio-image">
					<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes="image"
							value={ mediaID }
							render={ ( { open } ) => (
								<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
									{ ! mediaID ? __( 'Upload image', 'batten-blocks' ) : <img src={ mediaURL } alt={ __( 'Upload image', 'batten-blocks' ) } /> }
								</Button>
							) }
						/>
				</div>

				<div className="bio-text">
					<RichText
						className="bio-name"
						tagName="h2"
						placeholder={ __( 'Add name here', 'batten-blocks' )}
						value={ name }
						onChange={ onChangeName }

					/>
					<RichText
						className="bio-subtitle"
						tagName="div"
						placeholder={ __( 'Add title here', 'batten-blocks' )}
						value={ title }
						onChange={ onChangeTitle }

					/>
					<RichText
						className="bio-paragraph"
						tagName="p"
						placeholder={ __( 'Add bio here', 'batten-blocks' )}
						value={ bio }
						onChange={ onChangeBio }

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
				name,
				title,
				bio,
				mediaURL,
			},
		} = props;
		return (
			<div className={ className }>
				{
					mediaURL && (
						<div className="bio-image">
							<img src={ mediaURL } alt={ __( 'Bio image', 'batten-blocks' ) } />
						</div>
					)
				}
				<div className="bio-text">
					<RichText.Content tagName="h2" className="bio-name" value={ name } />
					<RichText.Content tagName="div" className="bio-subtitle" value={ title } />
					<RichText.Content tagName="p" className="bio-paragraph" value={ bio } />
				</div>
			</div>
		);
	},
} );
