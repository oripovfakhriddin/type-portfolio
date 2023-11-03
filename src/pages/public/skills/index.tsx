import { useEffect, Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./style.scss";
import { getSkills } from "../../../redux/slices/skills";
import { Flex, Input, Pagination, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
const SkillsPage = () => {
  const { skills, loading, total } = useAppSelector((state) => state.skills);

  const newSkills = skills.map((skill) => ({ ...skill, key: skill._id }));

  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getSkills({ active, search }));
  }, [dispatch, search, active]);

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
        {total === 0 ? <p>Skills not</p> : <p>All skills count: {total}</p>}
      </Flex>

      <Table
        scroll={{ x: 800 }}
        loading={loading}
        pagination={false}
        dataSource={newSkills}
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

export default SkillsPage;
