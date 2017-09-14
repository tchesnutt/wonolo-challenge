export const fetchJobs = ( query, success ) => {
  console.log(query);
  $.ajax({
    method: 'GET',
    url: `/api/job?address=${query.address}&city=${query.city}&zip=${query.zip}`,
    success
  })
};
