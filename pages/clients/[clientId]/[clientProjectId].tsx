import { NextRouter, useRouter } from "next/router";

const ClientProjectIdPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  console.log(router.pathname);
  const clientId = router.query.clientId;
  const projectId = router.query.clientProjectId;
  return (
    <div>
      <h1>client project id Page</h1>
      <h2>Client Id: {clientId}</h2>
      <h2>Project Id: {projectId}</h2>
    </div>
  );
};

export default ClientProjectIdPage;
