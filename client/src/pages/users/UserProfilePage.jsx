import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TextInput,
} from "flowbite-react";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../services/userService";
import { updateUser } from "../../services/authService";

const UserProfilePage = () => {
  const [loading, setLoading] = useState(true); // State for loading
  const { currentUser } = useSelector((state) => state.authentication); // Get current user from Redux
  const authId = currentUser?.user?._id; // Extract user ID
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userModal, setUserModal] = useState(false);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "postalCode") {
      setPostalCode(value);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create an object with only non-empty fields
      const formData = {};
      if (username) formData.username = username;
      if (email) formData.email = email;
      if (password) formData.password = password;

      // Ensure at least one field is provided for the update
      if (Object.keys(formData).length === 0) {
        toast.error("No fields provided for update.");
        setLoading(false);
        return;
      }

      const response = await updateUser(formData);
      if (!response.ok) {
        toast.error("Failed to update user details");
      }
      console.log(response);
      loadUserProfile(authId);

      // Show the success message as HTML
      toast.success("User details updated successfully");
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create an object with only non-empty fields
      const formData = {};
      if (username) formData.firstName = firstName;
      if (lastName) formData.lastName = lastName;
      if (phoneNumber) formData.phoneNumber = phoneNumber;
      if (address) formData.address = address;
      if (city) formData.city = city;
      if (postalCode) formData.postalCode = postalCode;

      // Ensure at least one field is provided for the update
      if (Object.keys(formData).length === 0) {
        toast.error("No fields provided for update.");
        setLoading(false);
        return;
      }

      const response = await updateUserProfile(formData);
      if (!response.ok) {
        toast.error("Failed to update user details");
      }
      console.log(response);
      loadUserProfile(authId);

      // Show the success message as HTML
      toast.success("User profile updated successfully");
      setUserModal(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetchUserProfile(authId); // Fetch user profile from the backend
      if (response) {
        setUsername(response.data.authId.username || "");
        setEmail(response.data.authId.email || "");
        setFirstName(response.data.firstName || "");
        setLastName(response.data.lastName || "");
        setPhoneNumber(response.data.phoneNumber || "");
        setAddress(response.data.address || "");
        setCity(response.data.city || "");
        setPostalCode(response.data.postalCode || "");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      toast.error("Failed to load user profile.");
      setLoading(false);
    }
  };

  // Fetch user profile when the component mounts
  useEffect(() => {
    if (authId) {
      loadUserProfile(authId);
    } else {
      toast.error("User not authenticated.");
      setLoading(false);
    }
  }, [authId]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 shadow items-center">
            <div>
              <Card className="items-center">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl uppercase underline">
                  User Details
                </h1>
                <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-5">
                  <div className="mb-4">
                    <Label
                      htmlFor="firstName"
                      className="mb-2 block text-gray-700"
                    >
                      First Name
                    </Label>
                    <TextInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={firstName}
                      disabled
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="lastName"
                      className="mb-2 block text-gray-700"
                    >
                      Last Name
                    </Label>
                    <TextInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={lastName}
                      disabled
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-5">
                  <div className="mb-4">
                    <Label
                      htmlFor="phoneNumber"
                      className="mb-2 block text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <TextInput
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      value={phoneNumber}
                      disabled
                      placeholder="Enter Phone Contact"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="address"
                      className="mb-2 block text-gray-700"
                    >
                      Address
                    </Label>
                    <TextInput
                      id="address"
                      name="address"
                      type="text"
                      value={address}
                      disabled
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-5">
                  <div className="mb-4">
                    <Label htmlFor="city" className="mb-2 block text-gray-700">
                      City
                    </Label>
                    <TextInput
                      id="city"
                      name="city"
                      type="text"
                      value={city}
                      disabled
                      placeholder="Enter City"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="postalCode"
                      className="mb-2 block text-gray-700"
                    >
                      Postal Code
                    </Label>
                    <TextInput
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={postalCode}
                      disabled
                      placeholder="Enter Postal Code"
                      required
                    />
                  </div>
                </div>

                <Button
                  className="bg-green-500 enabled:hover:bg-green-800"
                  onClick={() => {
                    setUserModal(true);
                    loadUserProfile(authId);
                  }}
                >
                  Update Profile
                </Button>
              </Card>
            </div>
            <div>
              <Card className="px-6">
                <h1 className="text-xl font-semibold text-gray-900 uppercase underline sm:text-2xl">
                  Other Details
                </h1>
                <div className="flex flex-col w-full gap-y-4">
                  <div className="mt-2">
                    <div className="mb-4">
                      <Label
                        htmlFor="username"
                        className="mb-2 block text-gray-700"
                      >
                        Username
                      </Label>
                      <TextInput
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={handleUserChange}
                        placeholder="Enter Username"
                      />
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="email"
                        className="mb-2 block text-gray-700"
                      >
                        Email Address
                      </Label>
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleUserChange}
                        placeholder="Enter Email Address"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <Label
                        htmlFor="password"
                        className="mb-2 block text-gray-700"
                      >
                        Password
                      </Label>
                      <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleUserChange}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  gradientDuoTone="purpleToPink"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUserSubmit(e);
                  }}
                >
                  Update User
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Modal onClose={() => setUserModal(false)} show={userModal} size="lg">
        <ModalHeader className="px-6 pb-0 pt-6 mb-4">
          <span className="uppercase">Edit User Profile</span>
        </ModalHeader>
        <ModalBody className="px-6 pb-6 pt-0">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
              <Spinner color="#4A90E2" size={100} />
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-3 text-center"
          >
            <div className="flex gap-x-2 sm:gap-x-20 md:gap-x-10">
              <div className="mb-4">
                <Label htmlFor="firstName" className="mb-2 block text-gray-700">
                  First Name
                </Label>
                <TextInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={handleUserChange}
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="lastName" className="mb-2 block text-gray-700">
                  Last Name
                </Label>
                <TextInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={handleUserChange}
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>

            <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-10">
              <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-10">
                <div className="mb-4">
                  <Label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-gray-700"
                  >
                    Phone Number
                  </Label>
                  <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={handleUserChange}
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="address" className="mb-2 block text-gray-700">
                  Address
                </Label>
                <TextInput
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={handleUserChange}
                  placeholder="Enter Address"
                  required
                />
              </div>
            </div>

            <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-10">
              <div className="mb-4">
                <Label htmlFor="city" className="mb-2 block text-gray-700">
                  City
                </Label>
                <TextInput
                  id="city"
                  name="city"
                  type="text"
                  value={city}
                  onChange={handleUserChange}
                  placeholder="Enter City"
                  required
                />
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="postalCode"
                  className="mb-2 block text-gray-700"
                >
                  Postal Code
                </Label>
                <TextInput
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={handleUserChange}
                  placeholder="Enter Postal Code"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <Button color="blue" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button color="gray" onClick={() => setUserModal(false)}>
                No, cancel
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserProfilePage;
