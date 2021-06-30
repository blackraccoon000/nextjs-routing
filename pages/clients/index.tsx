import Link from "next/link";

const ClientPage = () => {
  const clients = [
    { id: "y", name: "Y" },
    { id: "s", name: "S" },
    { id: "n", name: "N" },
  ];

  return (
    <div className={"center"}>
      <h1>Client Pages</h1>
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link
                href={{
                  pathname: `/clients/[id]`,
                  query: { id: client.id },
                }}
              >
                {client.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientPage;
