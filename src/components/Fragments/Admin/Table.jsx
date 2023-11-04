const Table = ({ column, data }) => {
  return (
    <table className="w-full min-w-[540px]">
      <thead>
        <tr>
          {column.map((v, i) => (
            <th
              key={i}
              className="text-[12px] uppercase tracking-wide font-medium text-gray-500 dark:text-gray-200 py-2 px-4 bg-gray-100 dark:bg-gray-600 text-left"
            >
              {v.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((v, i) => (
          <tr key={i}>
            {column.map((data, index) => {
              if (data.useTemplate) {
                const Template = data.Template;
                return <Template key={index} keyIndex={index} dataId={v.id} />;
              } else {
                return (
                  <td
                    key={index}
                    className="px-4 py-2 border-b border-b-gray-50"
                  >
                    <span className="ml-2 text-sm font-medium text-gray-500 truncate dark:text-gray-200 hover:text-blue-500">
                      {v[data.column]}
                    </span>
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
