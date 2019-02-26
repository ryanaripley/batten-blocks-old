<?php
/**
 * Plugin Name: Batten Blocks
 * Plugin URI: https://github.com/ryanaripley/batten-blocks
 * Description: Batten Blocks is a series of custom blocks created via create-guten-block.
 * Author: Ryan A. Ripley
 * Author URI: https://ryanaripley.com
 * Version: 0.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
