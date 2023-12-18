import React, { useEffect, useState } from 'react';
import PageTitle from '../components/Typography/PageTitle';
import { Link } from 'react-router-dom';
import { Input, Label, Button } from '@windmill/react-ui';
import DefaultAvatar from '../assets/img/unnamed.png';
import { connect } from 'react-redux';
import { fetchUser, unMapStudentId, mapStudentId } from '../actions';
import Modals from '../components/Modals/Modals';

function UserDetail(props) {
  const [isUnmapModalOpen, setUnmapModaOpen] = useState(false);
  const [studentId, setStudentId] = useState(null);
  useEffect(() => {
    props.fetchUser(props.match.params.id);
  }, [props]);

  if (!props.user) {
    return <div>Loading...</div>;
  }

  const { user } = props;

  function onStudentIdChange(e) {
    const value = e.target.value;
    if (value.length > 10) {
      return;
    }
    setStudentId(value);
  }

  function handleCloseUnmapModal() {
    setUnmapModaOpen(false);
  }

  function handleUnmapStudentId() {
    props.unMapStudentId(user._id);
    setUnmapModaOpen(false);
    setStudentId('');
  }

  function handleMapStudentId() {
    if (studentId.length === 0) return;
    props.mapStudentId(user._id, studentId);
  }

  const modalActions = (
    <>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={handleCloseUnmapModal}>
          Cancel
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button onClick={handleUnmapStudentId}>Accept</Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button
          block
          size="large"
          layout="outline"
          onClick={handleCloseUnmapModal}
        >
          Cancel
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button onClick={handleUnmapStudentId} block size="large">
          Accept
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>User Detail</PageTitle>
        <div>
          <Link to="/users">
            <Button>Back</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex mb-6">
          <div className="flex-shrink-0 flex justify-center w-64">
            <img
              className="mt-8 w-28 h-28 rounded-full"
              src={DefaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="mt-8 mr-4 flex-1 w-full">
            <form>
              <Label>
                <span>Fullname</span>
                <Input
                  className="mt-1"
                  placeholder="Fullname"
                  defaultValue={user.name}
                  disabled
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span>Email</span>
                <Input
                  disabled
                  defaultValue={user.email}
                  className="mt-1"
                  placeholder="Email"
                  type="email"
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span>Phone Number</span>
                <Input
                  disabled
                  className="mt-1"
                  placeholder="Phone Number"
                  type="number"
                  defaultValue={user.phoneNumber}
                  valid
                />
              </Label>
              <Label className="mt-4">
                <span>Student Id</span>
                <Input
                  disabled={user.student ? true : false}
                  className="mt-1"
                  placeholder="Student Id"
                  type="number"
                  defaultValue={user.student}
                  value={studentId}
                  onChange={onStudentIdChange}
                  maxLength={12}
                />
              </Label>
              {user.student ? (
                <Button
                  className="mt-2 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => setUnmapModaOpen(true)}
                >
                  Unmap
                </Button>
              ) : (
                <Button className="mt-2" onClick={handleMapStudentId}>
                  Map
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
      <Modals
        isOpenModal={isUnmapModalOpen}
        setClose={handleCloseUnmapModal}
        header="Warning"
        actions={modalActions}
      >
        {`Do you want to unmap studentId: ${user.student}?`}
      </Modals>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  unMapStudentId,
  mapStudentId,
})(UserDetail);
