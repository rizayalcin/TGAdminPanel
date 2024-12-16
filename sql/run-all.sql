-- Run all SQL files in correct order
:r .\tables\01_categories.sql
GO
:r .\tables\02_operators.sql
GO
:r .\tables\03_themes.sql
GO
:r .\tables\04_regions.sql
GO
:r .\tables\05_countries.sql
GO
:r .\tables\06_cities.sql
GO
:r .\tables\07_guides.sql
GO
:r .\tables\08_guide_languages.sql
GO
:r .\tables\09_tours.sql
GO
:r .\tables\10_tour_days.sql
GO
:r .\tables\11_tour_services.sql
GO
:r .\triggers\01_tours_update.sql
GO