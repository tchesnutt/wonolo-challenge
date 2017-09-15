export const fetchJobs = ( query ) => {
  return(
    $.ajax({
    method: 'GET',
    url: `/api/jobs?address=${query.address}&city=${query.city}&zip=${query.zip}&dist=${query.dist}mi`,
  }))
};
