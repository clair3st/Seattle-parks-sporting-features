page('/', homeController.index);

page('/about', aboutController.index);

page('/park/:id',
  parksController.loadById,
  parksController.index);

page();
