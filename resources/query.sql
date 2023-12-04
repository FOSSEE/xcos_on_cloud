SELECT loc.id AS category_id, loc.category_name,
       pe.id AS book_id, pe.book, pe.author,
       tcc.id AS chapter_id, tcc.number, tcc.name,
       tce.id AS example_id, tce.number, tce.caption,
       tcef.id AS example_file_id, tcef.filename, tcef.filepath
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
      tcef.xcos_cloud_example_file_error_status = 0 AND
      pe.approval_status = 1
ORDER BY 2, 4, 7, 10, 12;

SELECT tcef.filepath
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
      tcef.xcos_cloud_example_file_error_status = 0 AND
      pe.approval_status = 1
ORDER BY 1;

SELECT COUNT(tcef.filepath)
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
      tcef.xcos_cloud_example_file_error_status = 0 AND
      pe.approval_status = 1;

SELECT filepath
FROM textbook_companion_example_files
WHERE example_id IN (
SELECT DISTINCT(tce.id)
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
      tcef.xcos_cloud_example_file_error_status = 0 AND
      pe.approval_status = 1
) AND filetype = 'S'
ORDER BY 1;

SELECT filetype, COUNT(*)
FROM textbook_companion_example_files
WHERE example_id IN (
SELECT tce.id
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
      tcef.xcos_cloud_example_file_error_status = 0 AND
      pe.approval_status = 1
)
GROUP BY 1;

SELECT filetype, COUNT(*)
FROM textbook_companion_example_files
WHERE example_id NOT IN (
SELECT tce.id
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
      tcef.xcos_cloud_example_file_error_status = 0 AND
      pe.approval_status = 1
)
GROUP BY 1;

DELETE
FROM textbook_companion_example_files
WHERE filetype = 'R';

DELETE
FROM textbook_companion_example_files
WHERE example_id NOT IN (
SELECT tce.id
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
      tcef.xcos_cloud_example_file_error_status = 0 AND
      pe.approval_status = 1
);

SELECT COUNT(*)
FROM textbook_companion_example
WHERE id NOT IN (
SELECT DISTINCT(example_id)
FROM textbook_companion_example_files
);

DELETE
FROM textbook_companion_example
WHERE id NOT IN (
SELECT DISTINCT(example_id)
FROM textbook_companion_example_files
);

SELECT COUNT(*)
FROM textbook_companion_chapter
WHERE id NOT IN (
SELECT DISTINCT(chapter_id)
FROM textbook_companion_example
);

DELETE
FROM textbook_companion_chapter
WHERE id NOT IN (
SELECT DISTINCT(chapter_id)
FROM textbook_companion_example
);

SELECT COUNT(*)
FROM textbook_companion_preference
WHERE id NOT IN (
SELECT DISTINCT(preference_id)
FROM textbook_companion_chapter
);

DELETE
FROM textbook_companion_preference
WHERE id NOT IN (
SELECT DISTINCT(preference_id)
FROM textbook_companion_chapter
);

SELECT COUNT(*)
FROM textbook_companion_proposal
WHERE id NOT IN (
SELECT DISTINCT(proposal_id)
FROM textbook_companion_preference
);

DELETE
FROM textbook_companion_proposal
WHERE id NOT IN (
SELECT DISTINCT(proposal_id)
FROM textbook_companion_preference
);

SELECT COUNT(*)
FROM list_of_category
WHERE id NOT IN (
SELECT DISTINCT(category)
FROM textbook_companion_preference
);

DELETE
FROM list_of_category
WHERE id NOT IN (
SELECT DISTINCT(category)
FROM textbook_companion_preference
);

SELECT COUNT(*)
FROM xcos_on_cloud_enable_book
WHERE book_id NOT IN (
SELECT DISTINCT(id)
FROM textbook_companion_preference
);
