import { useEffect, Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./style.scss";
import { getSkills } from "../../../redux/slices/skills";
import { Flex, Input, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
const SkillsPage = () => {
  const { data, loading } = useAppSelector((state) => state.skills);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getSkills({ search }));
  }, [dispatch, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="skills__header__box"
        align="center"
      >
        <h1 className="skills__title">Skills</h1>
        <Input
          className="skills__search"
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="skills__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="skills__count__box">
        {data.pagination.total === 0 ? (
          <p>Skills not</p>
        ) : (
          <p>All skills count: {data.pagination.total}</p>
        )}
      </Flex>

      <Table
        scroll={{ x: 800 }}
        loading={loading}
        pagination={false}
        dataSource={data.data}
      >
        <ColumnGroup title="Name">
          <Column
            title="First Name"
            dataIndex="user"
            key="user"
            render={(data) => {
              return <p>{data?.firstName}</p>;
            }}
          />
          <Column
            title="Last Name"
            dataIndex="user"
            key="user"
            render={(data) => {
              return <p>{data?.lastName}</p>;
            }}
          />
        </ColumnGroup>
        <Column title="Skill" dataIndex="name" key="name" />
        <Column title="Percent" dataIndex="percent" key="percent" />
      </Table>
    </Fragment>
  );
};

export default SkillsPage;
