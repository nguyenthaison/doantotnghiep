Fabricator :rank do
  number
  start_date DateTime.now.beginning_of_week - 7.day
  end_date DateTime.now.beginning_of_week - 1.day
  view_start
  view_end
  target_type
  target_id
end
