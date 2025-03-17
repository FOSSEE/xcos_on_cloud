/* description: Basic Electronics (Author: D. De), 3) Diode Circuits, 3.27) Find currents and voltages */
/* book_id: 181 */
/* script_path: 181/CH3/EX3.27/example3_27.sce */
SELECT pe.book || ' (Author: ' || pe.author || '), ' || tcc.number || ') ' || tcc.name || ', ' || tce.number || ') ' || tce.caption AS description,
pe.id AS book_id,
(SELECT filepath FROM textbook_companion_example_files WHERE example_id = tce.id AND filetype = 'S') AS script_path
FROM textbook_companion_preference pe
JOIN textbook_companion_proposal po ON pe.proposal_id = po.id
JOIN list_of_category loc ON pe.category = loc.id
JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id
JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id
JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id
JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id
WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND
tcef.xcos_cloud_example_file_error_status = 0 AND
pe.approval_status = 1 AND
tcef.filepath = '@@FILEPATH@@'
