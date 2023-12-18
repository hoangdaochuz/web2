import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../components/Typography/PageTitle';
import { fetchAdmins } from '../actions';
import { Link } from 'react-router-dom';
import { Input } from '@windmill/react-ui';
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
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui';
import DefaultAvatar from '../assets/img/unnamed.png';
import { EditIcon, SortIcon } from '../icons';

function AdminPage(props) {
  const [pageTable, setPageTable] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    props.fetchAdmins();
  }, []);

  let dataTable = props.admins;
  dataTable = dataTable.filter((admin) => {
    return (
      admin.name.toLowerCase().includes(searchName.toLowerCase()) &&
      admin.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
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
  const totalResults = props.admins.length;

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
        <PageTitle>Admins</PageTitle>
        <div className="my-6">
          <Link to="/admins/create">
            <Button>
              Create account
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex mb-4">
        <Input
          className="mr-4"
          aria-label="Bad"
          placeholder="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          aria-label="Bad"
          placeholder="Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      {props.admins.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Admin</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
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
              {dataTable.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-3 md:block"
                        src={DefaultAvatar}
                        alt="User avatar"
                      />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Super admin
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.email}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>{user.phoneNumber}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-4">
                      <Link to={`/admins/${user._id}`}>
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
    admins: Object.values(state.admins),
  };
};

export default connect(mapStateToProps, { fetchAdmins })(AdminPage);
