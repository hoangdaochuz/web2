import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/Typography/PageTitle';
import { Input, Label, Button } from '@windmill/react-ui';
import { connect } from 'react-redux';
import { fetchClass } from '../actions';
import ClassImage from '../assets/img/class.jpg';

function ClassDetail(props) {
  useEffect(() => {
    props.fetchClass(props.match.params.id);
  }, []);

  if (!props.cl) {
    return <div>Loading...</div>;
  }

  const { cl } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>{cl.name}</PageTitle>
        <div>
          <Link to="/classes">
            <Button>Back</Button>
          </Link>
        </div>
      </div>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-wrap mb-6">
          <div className="mt-8 p-4" style={{ width: '400px' }}>
            <img src={ClassImage} alt="avatar" />
          </div>
          <div className="mt-8 mr-4 flex-1">
            <Label className="mt-4">
              <span>Classname</span>
              <Input
                className="mt-1"
                placeholder="Fullname"
                defaultValue={cl.name}
                disabled
                valid
              />
            </Label>
            <Label className="mt-4">
              <span>Description</span>
              <Input
                className="mt-1"
                placeholder="Description"
                defaultValue={cl.description}
                disabled
                valid
              />
            </Label>
            <Label className="mt-4">
              <span>Owner</span>
              <Input
                className="mt-1"
                placeholder="Owner"
                defaultValue={cl.owner.name}
                disabled
                valid
              />
            </Label>
            <Label className="mt-4">
              <span>Number of students</span>
              <Input
                className="mt-1"
                placeholder="Owner"
                defaultValue={cl.students.length}
                disabled
                valid
              />
            </Label>
            <Label className="mt-4">
              <span>Teachers</span>
              <ul className="bg-white rounded-lg w-96 text-gray-900">
                {cl.teachers.map((teacher) => (
                  <li
                    key={teacher.id}
                    className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                  >
                    {teacher.name}
                  </li>
                ))}
              </ul>
            </Label>
            <Label className="mt-4">
              <span className="mr-4">Date created:</span>
              {new Date(cl.createdAt).toLocaleDateString()}
            </Label>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    cl: state.classes[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchClass })(ClassDetail);
