import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RegistrationPage.css';
import axios from '../services/api/axios';

function RegistrationPage1() {
  const { id } = useParams();

  const [students, setStudents] = useState([
    { name: '', ktu_id: '', college: '', gender: '', phone: '', accommodation1: false, accommodation2: false },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const list = [...students];
    if (type === 'checkbox') {
      list[index][name] = checked;
    } else {
      list[index][name] = value;
    }
    setStudents(list);
  };

  const handleAddStudent = () => {
    setStudents([
      ...students,
      { name: '', ktu_id: '', college: '', gender: '', phone: '', accommodation1: false, accommodation2: false },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/event/${id}/`;
    axios
      .post(url, JSON.stringify(students), {
        headers: { Authorization: `Token ${localStorage.getItem('access')}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(JSON.stringify(students)));
  };
  return (
    <div className="table-container">
      <table>
        <tr>
          <th>Name</th>
          <th>KTU Id</th>
          <th>College</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Accommodation</th>
        </tr>

        {students.map((student, index) => (
          <tr key={index}>
            <td htmlFor={`name-${index}`}>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={student.name}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </td>
            <td htmlFor={`ktuId-${index}`}>
              <input
                type="text"
                id={`ktu_id-${index}`}
                name="ktu_id"
                value={student.ktu_id}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </td>
            <td htmlFor={`college-${index}`}>
              <input
                type="text"
                id={`college-${index}`}
                name="college"
                value={student.college}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </td>
            <td htmlFor={`gender-${index}`}>
              <select
                id={`gender-${index}`}
                name="gender"
                value={student.gender}
                onChange={(e) => handleInputChange(e, index)}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </td>
            <td htmlFor={`phone-${index}`}>
              <input
                type="tel"
                id={`phone-${index}`}
                name="phone"
                value={student.phone}
                onChange={(e) => handleInputChange(e, index)}
                pattern="[0-9]{10}"
                required
              />
            </td>
            <td>
              <label htmlFor={`day1-${index}`}>
                May 3
                <input
                  type="checkbox"
                  id={`day1-${index}`}
                  name="accommodation1"
                  checked={student.accommodation1}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </label>
              <label htmlFor={`day2-${index}`}>
                May 4
                <input
                  type="checkbox"
                  id={`day2-${index}`}
                  name="accommodation2"
                  checked={student.accommodation2}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </label>
            </td>
          </tr>
        ))}
      </table>
      <button type="button" onClick={handleAddStudent} className="btn-outline">
        Add Team Member
      </button>
      <br />
      <button type="submit" className="btn-submit" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
}

export default RegistrationPage1;
