# How to generate server pass key?

Open terminal and follow below steps

### Step 1: Let's generate the server pass key
root/: $ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

### Step 2: now generate the server key from the pass key
root/: $ openssl rsa -passin pass:x -in server.pass.key -out server.key

### Step 3:  we remove the pass key
root/: $ rm server.pass.key

### Step 4: now let's create the .csr file
root/: $ openssl req -new -key server.key -out server.csr
...
VN
HCMC
HCMC
Eastwest
development
Rabih
rabih.souk@eastwest.live
rabih
e2w
...

### Step 5: now let's create the .crt file
root/: $ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
