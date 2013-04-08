<?
/*
// Debug functions
error_reporting(E_ALL);
error_log('./php_errors');
ini_set('display_errors', 1);
*/

// Set the source folder
$folder = 'images';
// Set the output json file name
$cache = 'images.json';
// Get the images from the source folder and remove the current and prev dir link
$tmp_images = array_slice(scandir($folder), 2);
// This will hold our final results
$images = array();

// Check to see if the output file exists. If not create it
if(!file_exists($cache)) {
	touch($cache);
	chmod($cache, 0666);
}

// Make sure we're only adding gifs
foreach($tmp_images as $image){
    if(exif_imagetype("{$folder}/{$image}") == IMAGETYPE_GIF){
        array_push($images, "{$folder}/{$image}");
    }
}

// Encode our output
$output = json_encode(array("images" => $images));

// Write out to file
file_put_contents("{$folder}/{$cache}", $output);
?>