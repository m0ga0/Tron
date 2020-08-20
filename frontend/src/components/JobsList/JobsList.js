import React,
{
  useState,
  useEffect
} from 'react';
import {Link} from "react-router-dom";
import {getJobColor} from '../../utils/utils';
import JobScheduler from '../JobScheduler';

function JobsList() {
  const [jobData, setJobData] = useState(undefined);

  useEffect(() => {
    fetch('http://dev54-uswest1adevc.dev.yelpcorp.com:8089/api/jobs')
      .then(response => response.json())
      .then(data => setJobData(data));
  }, []);

  if (jobData === undefined) {
      return (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
  }

  const tableRows = jobData['jobs'].map((job) =>
    <tr key={job['name']} class="clickable">
      <td>
        <Link class="text-dark" to={"job/" + job['name']}>{job['name']}</Link>
      </td>
      <td class={"text-" + getJobColor(job['status'])}>{job['status']}</td>
      <td><JobScheduler scheduler={job['scheduler']}/></td>
      <td>{job['node_pool']['name']}</td>
      <td>{job['last_success']}</td>
      <td>{job['next_run']}</td>
    </tr>
  );
  return (
    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Schedule</th>
          <th>Node pool</th>
          <th>Last success</th>
          <th>Next run</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}

export default JobsList;
