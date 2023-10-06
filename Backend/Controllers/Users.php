<?php
 

 include_once '../lib.php';

session_start();

if (isset($_POST) && !empty($_POST)) {
    $response = array();
    extract(array_map("test_input", $_POST));

    if (empty($tag)) {
        $response["message"] = "Tag is required.";
        $response["status"] = "400";
        echo json_encode($response);
    } else {
        $tag = trim($tag);
        $name = trim($name);
        $email = trim($email);
        $password = trim($password);

        if ($tag == 'Login') {
            if (empty($email) || empty($password)) {
                $response["message"] = "Email and password are required.";
                $response["status"] = "400";
                http_response_code(400);
                echo json_encode($response);
            } else {
                date_default_timezone_set("Asia/Kolkata");
                
                // Set the time zone in MySQL
                // Get the current login attempts and last attempt time from the users table
                $getUserQuery = "SELECT user_id, login_attempts, last_attempt_time FROM users WHERE email='$email'";
                $getUserResult = mysqli_query($con, $getUserQuery);
                
                if ($getUserResult && mysqli_num_rows($getUserResult) > 0) {
                    $userData = mysqli_fetch_assoc($getUserResult);
                    $userId = $userData['user_id'];
                    $loginAttempts = $userData['login_attempts'];
                    $lastAttemptTime = strtotime($userData['last_attempt_time']);
                    $currentTimestamp = time();
                    // echo $currentTimestamp-$lastAttemptTime;
                    $hourInSeconds = 3600; // 1 hour
                    
                    // Check if the user has reached 3 or more failed attempts within the last hour
                    if ($loginAttempts >= 3 && ($currentTimestamp - $lastAttemptTime) < $hourInSeconds) {
                        $response["message"] = "Too many login attempts. Please try again in one hour.";
                        $response["status"] = "429";
                        http_response_code(429);
                        echo json_encode($response);
                    } else {
                        $q = $d->select(
                            "users", 
                            "email='$email' AND password='$password'", 
                            ""
                        );
                        if (mysqli_num_rows($q) > 0) {
                            mysqli_query($con, "UPDATE users SET login_attempts=0, last_attempt_time=NULL WHERE user_id=$userId");
                
                            $response["userDetails"] = array();
                
                            while ($data_app = mysqli_fetch_array($q)) {
                                $userDetails = array();
                                $userDetails["name"] = $data_app["name"];
                                $userDetails["email"] = $data_app["email"];
                                $userDetails["created_at"] = $data_app["created_at"];
                
                                // Add addresses to the user details
                                
                
                                array_push($response["userDetails"], $userDetails);
                            }
                
                            $response["message"] = "Login success.";
                            $response["status"] = "200";
                            http_response_code(200);
                            echo json_encode($response);
                           } else {

                            $date_op = date('Y-m-d H:i:s'); // Get the current timestamp
                            
                            // Update the user's login_attempts and last_attempt_time in the users table
                            $updateQuery = "UPDATE users SET login_attempts =login_attempts + 1 , last_attempt_time = '$date_op' WHERE user_id = $userId";
                            $q = mysqli_query($con, $updateQuery);
            
                            $response["message"] = "Wrong Credentials.";
                            $response["status"] = "201";
                            http_response_code(201);
                            echo json_encode($response);
                        }
                    }
                } else {
                    // User not found
                    $response["message"] = "User not found.";
                    $response["status"] = "404";
                    http_response_code(404);
                    echo json_encode($response);
                }
            }
        }
        elseif ($tag == "Register") {
            if (empty($name)  || empty($email) || empty($password)) {
                $response["message"] = "All fields are required for registration.";
                $response["status"] = 400;
                http_response_code(400);
                echo json_encode($response);
            } else {
                $m->set_data('name', $name);
                $m->set_data('user_type', 'user');
                $m->set_data('email', $email);
                $m->set_data('password', $password);
                $a = array(
                    'name' => $m->get_data('name'),
                    'user_type' => $m->get_data('user_type'),
                    'email' => $m->get_data('email'),
                    'password' => $m->get_data('password'),
                    'created_at' => date('Y-m-d H:i:s')
                );

                $existingemail = $d->select("users", "email='" . $m->get_data('email') . "'");

                if ($existingemail && $existingemail->num_rows > 0) {
                    $response["message"] = "Email with the same Email already exists.";
                    $response["status"] = 409;
                    http_response_code(409);
                    echo json_encode($response);
                } else {
                    $q = $d->insert("users", $a);
                    $sub_id = $con->insert_id;

                    if ($q == true) {
                        $response['sub_id'] = $sub_id;
                        $response['message'] = 'Register successfully';
                        $response['status'] = 200;
                        http_response_code(200);
                        echo json_encode($response);
                    } else {
                        $response["message"] = "Registration failed.";
                        $response["status"] = 500;
                        http_response_code(500);
                        echo json_encode($response);
                    }
                }
            }
        }
         else {
            $response["message"] = "Invalid tag.";
            $response["status"] = 400;
            http_response_code(400);
            echo json_encode($response);
        }
    }
} else {
    $response["message"] = "No data received.";
    $response["status"] = 400;
    http_response_code(400);
    echo json_encode($response);
}
?>