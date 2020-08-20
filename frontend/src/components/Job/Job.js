import React,
{
  useState,
  useEffect
} from 'react';
import {
  useParams,
} from "react-router-dom";
import JobScheduler from '../JobScheduler';
import JobSettings from '../JobSettings';
import ActionGraph from '../ActionGraph';
import {getJobColor} from '../../utils/utils';

function Job() {
  const [job, setJobData] = useState(undefined);
  const { jobId } = useParams();

  useEffect(() => {
    document.title = jobId;
    var endpoint = 'http://dev54-uswest1adevc.dev.yelpcorp.com:8089/api/jobs/' + jobId + '?include_action_graph=1';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setJobData(data));
  }, [jobId]);

  if (job === undefined) {
      var jobContent = (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
  } else {
      jobContent = jobDisplay(job);
  }

  return (
     <div class="p-3">
     <div class="page-header mb-5">
       <h1>{jobId}</h1>
     </div>
     {jobContent}
     </div>
  );
}

function jobDisplay(job) {
  return (
     <div class="row">
         <div class="col-md-5">
             <h2>Details</h2>
             <div>
             <table class="table details">
                 <tbody>
                 <tr><td>Status</td>
                     <td class={"text-" + getJobColor(job['status'])}>{job['status']}</td></tr>
                 <tr><td>Node pool</td>
                     <td>{job['node_pool']['name']}</td></tr>
                 <tr><td>Schedule</td>
                     <td><JobScheduler scheduler={job['scheduler']}/></td></tr>
                 <tr>
                   <td>Settings</td>
                   <td><JobSettings allowOverlap={job['allow_overlap']} queueing={job['queueing']} allNodes={job['all_nodes']}/></td>
                 </tr>
                 <tr><td>Last success</td>
                     <td>{job['last_success']}</td></tr>
                 <tr><td>Next run</td>
                     <td>{job['next_run']}</td></tr>
                 </tbody>
             </table>
             </div>
         </div>
         <div class="col-md-7">
             <h2>Action Graph</h2>
             <ActionGraph graph={job['action_graph']} height="400" width="450"/>
         </div>
     </div>
  );
}

export default Job;
