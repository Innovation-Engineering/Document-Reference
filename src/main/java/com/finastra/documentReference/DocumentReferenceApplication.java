package com.finastra.documentReference;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finastra.documentReference.data.Address;
import com.finastra.documentReference.data.User;
import com.finastra.documentReference.repo.UserRepository;
import com.finastra.documentReference.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;

@SpringBootApplication
public class DocumentReferenceApplication implements CommandLineRunner {
	private UserRepository userRepository;
	@Autowired
	private UserService userService;
	public static void main(String[] args) {
		SpringApplication.run(DocumentReferenceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userService.clearUser();
		createUser("users.json");
	}
	public void createUser(String fileImport) throws IOException {
		//System.out.println(ReadUsers.read(fileImport).stream().filter());
		ReadUsers.read(fileImport).forEach(readUser ->
				userService.createUser(readUser.getUserType(),
						(readUser.getReportsTo() != null) ? readUser.getReportsTo() : "none assigned" ,
						readUser.getEmail(), readUser.getDetails()));
	}

	private static class ReadUsers {
		//fields
		private String userType;
		private String reportsTo;
		private String email;

		Map<String, String> details;
		//reader
		ReadUsers(Map<String, String> record){
			this.userType = record.get("userType");
			this.reportsTo = record.get("reportsTo");
			this.email = record.get("email");
			this.details = record;
			this.details.remove("userType");
			this.details.remove("reportsTo");
			this.details.remove("email");
		}
		protected ReadUsers(){}
		static Address createAddress(Map<String, String> records){
			return new Address(records.get("address"),"_");
		}
		//Read .json file
		static List<ReadUsers> read(String fileToImport) throws IOException {
			List<Map<String, String>> records = new ObjectMapper().setVisibility(FIELD, ANY).
					readValue(new FileInputStream(fileToImport),
							new TypeReference<List<Map<String, String>>>() {});
			return records.stream().map(ReadUsers::new)
					.collect(Collectors.toList());
		}
		public String getUserType(){
			return userType;
		}
		public String getReportsTo(){
			return reportsTo;
		}
		public String getEmail() {
			return email;
		}
		Map<String, String> getDetails() {
			return details;
		}
	}
}
