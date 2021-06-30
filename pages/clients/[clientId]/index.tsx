import { NextRouter, useRouter } from "next/router";

const ClientProjectPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const id = router.query.clientId;

  const loadProjectHandler = async () => {
    //	load data...
    await router.push({
      pathname: `/clients/[clientId]/[clientProjectId]`,
      query: {
        clientId: id,
        clientProjectId: "projectA",
      },
    });
  };

  return (
    <div className={"center"}>
      <h1>Clients Project Page</h1>
      <h2>ClientId : {id}</h2>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export default ClientProjectPage;
