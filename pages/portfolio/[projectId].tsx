import { NextRouter, useRouter } from "next/router";

const PortfolioProjectPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  console.log(router.pathname);
  console.log(router.query.projectId);
  return (
    <div className={"center"}>
      <h1>The Portfolio Project</h1>
    </div>
  );
};

export default PortfolioProjectPage;
