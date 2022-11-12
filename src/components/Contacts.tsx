import * as React from "react";
import { useTodosQuery } from "../services/todosApi";

interface IContactsProps {}

const Contacts: React.FunctionComponent<IContactsProps> = (props) => {
  const { data, error, isLoading, isFetching, isSuccess } = useTodosQuery();
  console.log(data);

  return (
    <>
      <h1>RTK Query</h1>

      {error && <p>Error Occurred</p>}
      {isLoading && <p>Loading</p>}
      {isFetching && <p>Fetching</p>}
      {isSuccess && <p>Success = {isSuccess}</p>}
    </>
  );
};

export default Contacts;
