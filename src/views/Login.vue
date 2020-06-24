<template>
    <div id="login">
        <section>
            <div class="col1">
                <h1>Vuegram</h1>
                <p>Welcome to sample social media web app</p>
            </div>
            <div class="col2" :class="{ 'signup-form': !showLoginForm }">
                <form v-if="showLoginForm" @submit.prevent>
                    <h1>Welcome Back</h1>

                    <label for="email1">Email</label>
                    <input
                        v-model.trim="loginForm.email"
                        type="text"
                        placeholder="you@email.com"
                        id="email1"
                    />

                    <label for="password1">Password</label>
                    <input
                        v-model.trim="loginForm.password"
                        type="password"
                        placeholder="*******"
                        id="password1"
                    />

                    <button @click="login" class="button">Log In</button>

                    <div class="extras">
                        <a>Forgot Password</a>
                        <a @click="toggleForm">Create an Account</a>
                    </div>
                </form>

                <form v-else @submit.prevent>
                    <h1>Get Started</h1>

                    <label for="name">Name</label>
                    <input
                        v-model.trim="signupForm.name"
                        type="text"
                        placeholder="your name"
                        id="name"
                    />

                    <label for="title">Title</label>
                    <input
                        v-model.trim="signupForm.title"
                        type="text"
                        placeholder="Company"
                        id="title"
                    />

                    <label for="email2">Email</label>
                    <input
                        v-model.trim="signupForm.email"
                        type="text"
                        placeholder="you@email.com"
                        id="email2"
                    />

                    <label for="password2">Password</label>
                    <input
                        v-model.trim="signupForm.password"
                        type="password"
                        placeholder="min 6 characters"
                        id="password2"
                    />

                    <button @click="signup" class="button">Sign Up</button>

                    <div class="extras">
                        <a @click="toggleForm">Back to Log In</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
const fb = require("../firebaseConfig");
export default {
    data() {
        return {
            loginForm: {
                email: "",
                password: ""
            },
            signupForm: {
                name: "",
                title: "",
                email: "",
                password: ""
            },
            showLoginForm: true
        };
    },
    methods: {
        toggleForm() {
            this.showLoginForm = !this.showLoginForm;
        },
        login() {
            fb.auth
                .signInWithEmailAndPassword(
                    this.loginForm.email,
                    this.loginForm.password
                )
                .then(user => {
                    this.$store.commit("setCurrentUser", user);
                    this.$store.dispatch("fetchUserProfile");
                    this.$router.push("/dashboard");
                })
                .catch(err => {
                    console.log(
                        "login signInWithEmailAndPassword error: ",
                        err
                    );
                });
        },
        signup() {
            fb.auth
                .createUserWithEmailAndPassword(
                    this.signupForm.email,
                    this.signupForm.password
                )
                .then(user => {
                    this.$store.commit("setCurrentUser", user);

                    //create user obj
                    fb.usersCollection
                        .doc(user.uid)
                        .set({
                            name: this.signupForm.name,
                            title: this.signupForm.title
                        })
                        .then(() => {
                            this.$store.dispatch("fetchUserProfile");
                            this.$router.push("/dashboard");
                        })
                        .catch(err => {
                            console.log("signup set user error: ", err);
                        });
                })
                .catch(err => {
                    console.log(
                        "signup createUserWithEmailAndPassword error: ",
                        err
                    );
                });
        }
    }
};
</script>
