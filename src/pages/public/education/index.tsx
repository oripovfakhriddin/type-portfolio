import { useEffect, Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import "./style.scss";
import { Flex, Input, Pagination, Table } from "antd";
import { changeDate } from "../../../utils";
import { getEducation } from "../../../redux/slices/education";
const EducationPage = () => {
  const { education, loading, total } = useAppSelector(
    (state) => state.education
  );

  const newEducation = education.map((edu) => ({ ...edu, key: edu._id }));

  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getEducation({ active, search }));
  }, [dispatch, search, active]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const columns = [
    {
      title: "Full name",
      dataIndex: "user",
      key: "name",
      render: (data: { firstName: string; lastName: string }) => (
        <p>
          {data?.firstName} {data?.lastName}
        </p>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => <time>{changeDate(date)}</time>,
    },
    {
      title: "Finish date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => <time>{changeDate(date)}</time>,
    },
  ];
  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="education__header__box"
        align="center"
      >
        <h1 className="education__title">Education</h1>
        <Input
          className="search__education"
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="education__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="education__count__box">
        {total === 0 ? (
          <p>Education not</p>
        ) : (
          <p>All education count: {total}</p>
        )}
      </Flex>
      <Table
        pagination={false}
        columns={columns}
        loading={loading}
        dataSource={newEducation}
        scroll={{ x: 1000 }}
      />
      {total > 10 ? (
        <Pagination
          total={total}
          pageSize={10}
          current={active}
          onChange={(page) => setActive(page)}
        />
      ) : null}
    </Fragment>
  );
};

export default EducationPage;
