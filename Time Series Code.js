// Load landsat 8 Top of atmosphere

var Collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select('B[1-7]')
.filter(ee.Filter.eq('WRS_PATH', 168))
.filter(ee.Filter.eq('WRS_ROW', 61));
print('Collection: ', Collection);

// Sort by a cloud cover property
var image = ee.Image(Collection.sort('CLOUD_COVER').first());
print('Least cloudy image: ', image);

//Display Map
var vizTrue = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
};

// Define area of interest and create buffer
var Nairobi = ee.Geometry.Point(36.816, -1.2821).buffer(15000);
Map.addLayer(image, vizTrue, 'Landsat Cloud Free Composite');
Map.addLayer(Nairobi, {}, 'Nairobi');
Map.centerObject(image, 10);

// Create and print chart
print(ui.Chart.image.series(Collection, Nairobi, ee.Reducer.mean(), 30));
