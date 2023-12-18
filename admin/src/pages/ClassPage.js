import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../components/Typography/PageTitle';
import { fetchClasses } from '../actions';
import { Link } from 'react-router-dom';
//import SectionTitle from '../components/Typography/SectionTitle';
import Spinner from '../components/Spinner/Spinner';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Input,
} from '@windmill/react-ui';
import { EditIcon, SortIcon } from '../icons';

function ClassPage(props) {
  const [pageTable, setPageTable] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    props.fetchClasses();
  }, []);

  if (!props.classes.length === 0) return <div>Loading...</div>;

  let dataTable = props.classes;
  dataTable = dataTable.filter((cl) => {
    return cl.name.toLowerCase().includes(searchName.toLowerCase());
  });

  dataTable = dataTable.sort((a, b) => {
    if (isAsc) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = props.classes.length;

  dataTable = dataTable.slice(
    (pageTable - 1) * resultsPerPage,
    pageTable * resultsPerPage
  );

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable(p);
  }

  function onSortChange() {
    setIsAsc(!isAsc);
  }

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Classes</PageTitle>
      </div>

      <div className="mb-4">
        <Input
          className="mr-4"
          aria-label="Bad"
          placeholder="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {props.classes.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Class</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Number of Students</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>Date Created</span>
                    <button onClick={onSortChange}>
                      <SortIcon className="ml-1" />
                    </button>
                  </div>
                </TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {/* <Avatar
                      className="hidden mr-3 md:block"
                      src={DefaultAvatar}
                      alt="Class avatar"
                    /> */}
                      <div>
                        <p className="font-semibold">{c.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{c.description}</span>
                  </TableCell>
                  <TableCell>
                    {console.log(c.name)}
                    <Badge type={c.status}>{c.owner.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span>{c.students.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-4">
                      <Link to={`/classes/${c._id}`}>
                        <Button layout="link" size="icon" aria-label="Edit">
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable2}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    classes: Object.values(state.classes),
  };
};

export default connect(mapStateToProps, { fetchClasses })(ClassPage);
