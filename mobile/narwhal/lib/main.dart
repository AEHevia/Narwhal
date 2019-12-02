import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:path/path.dart' show join;
import 'package:path_provider/path_provider.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/rendering.dart';
import 'package:dio/dio.dart';

class Destination {
  const Destination(this.index, this.title, this.icon, this.color);
  final int index;
  final String title;
  final IconData icon;
  final MaterialColor color;
}

class AnimalInfo {
  const AnimalInfo(this.type, this.info);
  final String type;
  final String info;
}

const List<Destination> allDestinations = <Destination>[
  Destination(0, 'Search', Icons.search, Colors.teal),
  Destination(1, 'Favorites', Icons.favorite, Colors.cyan),
  Destination(2, 'Camera', Icons.photo_camera, Colors.orange),
];

class DetailPage extends StatelessWidget {

  final User user;

  DetailPage(this.user);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text(user.name),
        )
    );
  }
}

class User {
  final String name;
  final String email;

  User(this.name, this.email);

}

class DestinationView extends StatefulWidget {
  final CameraDescription camera;
  final String userID;

  const DestinationView({ Key key, this.destination, Key cameraKey, this.camera, Key userIDKey, this.userID}) : super(key: key);

  final Destination destination;

  @override
  _DestinationViewState createState() => _DestinationViewState();
}

class _DestinationViewState extends State<DestinationView> {
  TextEditingController _textController;

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController(
      text: 'sample text: ${widget.userID}',
    );
  }

  @override
  Widget build(BuildContext context) {
    if (widget.destination.title == 'Camera') {
      return TakePictureScreen(camera: widget.camera);
    }
    else if (widget.destination.title == 'Search') {
      return new SearchPage(userID: widget.userID);
    }
    else {
      return new DisplayFavoritesScreen(userID: widget.userID);
    }
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }
}

class DisplayFavoritesScreen extends StatefulWidget {
  final userID;

  const DisplayFavoritesScreen({ Key key, this.userID }): super(key: key);

  @override
  DisplayFavoritesScreenState createState() => DisplayFavoritesScreenState();
}

class DisplayFavoritesScreenState extends State<DisplayFavoritesScreen> {
  Future<List<String>> _favoriteAnimals;

  @override
  void initState() {
    super.initState();
    _favoriteAnimals = _getFavoriteAnimals();
  }

  Set<String> _saved;


  Future<List<String>> _getFavoriteAnimals() async {
    this._saved = new Set();

    String _userID = widget.userID;
    print('UserID: ' + _userID);
    String url = 'https://narwhal-poosd.herokuapp.com/api/user/listfavorites';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"userID": "$_userID"}';
    
    print('Sending POST: ' + json);

    var data = await http.post(url, headers: headers, body: json);

    print(data.body);

    List<dynamic> response = jsonDecode(data.body);

    print(response);

    List<String> listOfFavorites = [];

    for (var item in response) {
      listOfFavorites.add(item);
      this._saved.add(item);
    }

    return listOfFavorites;
  }

  void _unfavorite(String _animalName) async {
    print('Unfavorite ' + _animalName);

    String _userID = widget.userID;
    print('UserID: ' + _userID);
    String url = 'https://narwhal-poosd.herokuapp.com/api/user/unfavorite';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"userID": "$_userID", "animalName": "$_animalName"}';

    print('Sending POST: ' + json);

    var data = await http.post(url, headers: headers, body: json);

    print(data.body);    
  }

  @override
  Widget build(BuildContext context) {
    Widget favoriteAnimals = new Container(
      child: FutureBuilder<List<String>>(
        future: _favoriteAnimals,
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.data == null) {
            return Container(
              child: Center(
                child: Text("Loading...")
              )
            );
          } else {
            return ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: snapshot.data.length,
              itemBuilder: (BuildContext context, int index) {
                return Card(
                  child: ListTile(
                    title: Text(snapshot.data[index]),
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => DisplayAnimalPage(animalName: snapshot.data[index])),
                    ),
                    /*
                    trailing: IconButton(
                      icon: alreadySaved ? new Icon(Icons.favorite) : new Icon(Icons.favorite_border),
                      color: alreadySaved ? Colors.red : null,
                      onPressed: () {
                        _unfavorite(snapshot.data[index]);
                        setState(() {
                          _favoriteAnimals = _getFavoriteAnimals();
                        });
                      },
                    ),
                    */
                  ),
                );
              },
            );
          }
        },
      ),
    );  

    return Scaffold(
      appBar: new AppBar(
        centerTitle: true,
        title: new Text('Narwhal'),
      ),
      body: new Scrollbar(
        child: ListView(
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
              'Favorite Animals', 
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20.0,
                ),
              ),
            ),
            favoriteAnimals,
          ],
        )
      )
    );
  }
}

// A screen that allows users to take a picture using a given camera.
class TakePictureScreen extends StatefulWidget {
  final CameraDescription camera;

  const TakePictureScreen({
    Key key,
    this.camera,
  }) : super(key: key);

  @override
  TakePictureScreenState createState() => TakePictureScreenState();
}

class TakePictureScreenState extends State<TakePictureScreen> {  
  CameraController _controller;
  Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();

    // To display the current output from the Camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      widget.camera,
      // Define the resolution to use.
      ResolutionPreset.medium,
    );

    if (widget.camera == null)
      print('widget.camera is null');
    else
      print('widget.camera is NOT null');

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Wait until the controller is initialized before displaying the
      // camera preview. Use a FutureBuilder to display a loading spinner
      // until the controller has finished initializing.
      appBar: new AppBar(
        centerTitle: true,
        title: new Text('Narwhal'),
      ),
      body: FutureBuilder<void>(
        future: _initializeControllerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // If the Future is complete, display the preview.
            return CameraPreview(_controller);
          } else {
            // Otherwise, display a loading indicator.
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed:  () async {
          // Take the Picture in a try / catch block. If anything goes wrong,
          // catch the error.
          try {
            // Ensure that the camera is initialized.
            await _initializeControllerFuture;

            // Construct the path where the image should be saved using the
            // pattern package.
            final path = join(
              // Store the picture in the temp directory.
              // Find the temp directory using the `path_provider` plugin.
              (await getTemporaryDirectory()).path,
              '${DateTime.now()}.png',
            );

            // Attempt to take a picture and log where it's been saved.
            await _controller.takePicture(path);

            // If the picture was taken, display it on a new screen.
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DisplayPictureScreen(imagePath: path),
              ),
            );
          } catch (e) {
            // If an error occurs, log the error to the console.
            print(e);
          }
        },
        child: Icon(Icons.photo_camera),
        backgroundColor: Colors.cyan,  
        elevation: 0.0,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,    
    );
  }
}


class DisplayPictureScreen extends StatefulWidget {
  final String imagePath;

  const DisplayPictureScreen({
    Key key,
    this.imagePath,
  }) : super(key: key);

  @override
  DisplayPictureScreenState createState() => DisplayPictureScreenState(); 
}
// A widget that displays the picture taken by the user.
class DisplayPictureScreenState extends State<DisplayPictureScreen> {
  String animalName = 'Narwhal';

  // DisplayPictureScreen({Key key, this.imagePath}) : super(key: key);

  @override
  void initState() {
    super.initState();
    this._getAnimalName();
  }

  void _getAnimalName() async {
    String url = 'https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/1cd33350-ca8a-457e-9ffd-24c856679c91/classify/iterations/Narwhal/image';
    Map<String, String> headers = {"Content-type": "application/octet-stream", "Prediction-Key": "89144960aa5c4fe695644634636d68de"};
    File imageFile = File(widget.imagePath);
    List<int> imageBytes = imageFile.readAsBytesSync();
    var response = await http.post(url, headers: headers, body: imageBytes);

    Map<String, dynamic> apiResultMap = jsonDecode(response.body);
    List<dynamic> predictionResults = apiResultMap['predictions'];

    String newAnimalName = predictionResults[0]['tagName'];

    setState(() {
      this.animalName = newAnimalName;
    });
  }

  Future<List<String>> _getAnimalFacts() async {
    String url = 'https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/1cd33350-ca8a-457e-9ffd-24c856679c91/classify/iterations/Narwhal/image';
    Map<String, String> headers = {"Content-type": "application/octet-stream", "Prediction-Key": "89144960aa5c4fe695644634636d68de"};
    File imageFile = File(widget.imagePath);
    List<int> imageBytes = imageFile.readAsBytesSync();
    var response = await http.post(url, headers: headers, body: imageBytes);

    Map<String, dynamic> apiResultMap = jsonDecode(response.body);
    List<dynamic> predictionResults = apiResultMap['predictions'];

    String newAnimalName = predictionResults[0]['tagName'];

    var databaseResult = await http.get("https://narwhal-poosd.herokuapp.com/api/animals/" + newAnimalName);

    Map<String, dynamic> animal = jsonDecode(databaseResult.body);  
    List<dynamic> animalInfo = animal['animal'];
    List<String> animalFacts = [];

    if (animalInfo == null) {
      return animalFacts;
    }

    var factList = animalInfo[0]['facts'];

    for (int i = 0; i < factList.length; i++) {
      animalFacts.add(i.toString() + ': ' + factList[i]);
    }

    return animalFacts;    
  }

  Future<String> _getAnimalImage() async {
    File imageFile = File(widget.imagePath);
    List<int> imageBytes = imageFile.readAsBytesSync();
    String base64Image = base64.encode(imageBytes);
    new Image.memory(base64.decode(base64Image), fit: BoxFit.cover);
  }

  Future<List<AnimalInfo>> _getAnimalInfo() async {
    String url = 'https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/1cd33350-ca8a-457e-9ffd-24c856679c91/classify/iterations/Narwhal/image';
    Map<String, String> headers = {"Content-type": "application/octet-stream", "Prediction-Key": "89144960aa5c4fe695644634636d68de"};
    File imageFile = File(widget.imagePath);
    List<int> imageBytes = imageFile.readAsBytesSync();
    var response = await http.post(url, headers: headers, body: imageBytes);

    Map<String, dynamic> apiResultMap = jsonDecode(response.body);
    List<dynamic> predictionResults = apiResultMap['predictions'];

    String newAnimalName = predictionResults[0]['tagName'].toLowerCase();

    var databaseResult = await http.get("https://narwhal-poosd.herokuapp.com/api/animals/" + newAnimalName);

    Map<String, dynamic> animal = jsonDecode(databaseResult.body);

    List<AnimalInfo> list = [];
    
    if (animal['animal'] == null) {
      return list;
    }

    Map<String, dynamic> animalInfo = animal['animal'][0];

    for (var entry in animalInfo.entries) {
      if (entry.key == 'summary' || entry.key == 'weight' || entry.key == 'lifespan') {
        list.add(new AnimalInfo(entry.key, entry.value));
      }
    }

    this.animalName = newAnimalName;
    return list;
  }

  @override
  Widget build(BuildContext context) {
    print('Image file path is: $widget.imagePath');
    
    File imageFile = File(widget.imagePath);
    List<int> imageBytes = imageFile.readAsBytesSync();
    String base64Image = base64.encode(imageBytes);
    print('Base64 string is: $base64Image');

    Widget animalInfo = new Container(
      child: FutureBuilder(
        future: _getAnimalInfo(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.data == null) {
            return Container(
              child: Center(
                child: Text("Loading...")
              )
            );
          } else {
            var list = ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: snapshot.data.length,
              itemBuilder: (BuildContext context, int index) {
                return Card(
                  child: ListTile(
                    title: Text(snapshot.data[index].type),
                    subtitle: Text(snapshot.data[index].info),
                  ),
                );
              },
            );

            return list;
          }
        },
      ),
    );

    Widget animalFacts = new Container(
      child: FutureBuilder(
        future: _getAnimalFacts(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.data == null) {
            return Container(
              child: Center(
                child: Text("Loading...")
              )
            );
          } else {
            return ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: snapshot.data.length,
              itemBuilder: (BuildContext context, int index) {
                return Card(
                  child: ListTile(
                    title: Text(snapshot.data[index]),
                  ),
                );
              },
            );
          }
        },
      ),
    );

    Widget animalImage = new Container(
      child: FutureBuilder(
        future: _getAnimalImage(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.data == null) {
            return Image.network(
              'https://images.unsplash.com/photo-151652838761' +
              '8-afa90b13e000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQi' +
              'OjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            );
          } else {
            return Image.network(
              snapshot.data,
            );
          }
        }
      )
    );
    
    return new MaterialApp(
      title: "",
      home: new Scaffold(
        appBar: new AppBar(
          centerTitle: true,
          title: new Text(this.animalName),
        ),
        body: new Scrollbar(
          child: ListView(
          children: <Widget>[
            new Image.memory(base64.decode(base64Image), fit: BoxFit.cover),
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
              'Animal Information', 
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20.0,
                ),
              ),
            ),
            animalInfo,
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
              'Fun Facts', 
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20.0,
                ),
              ),
            ),
            animalFacts,
          ],
          )
        )
      )
    );
  }

    @override
  void dispose() {
    super.dispose();
  }
}

class HomePage extends StatefulWidget {
  final CameraDescription camera;
  final String userID;

  const HomePage({
    Key key, this.camera, Key userIDKey, this.userID
  }) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with TickerProviderStateMixin<HomePage> {
  int _currentIndex = 1;

  @override
  Widget build(BuildContext context) {

    print(widget.userID);

    return Scaffold(
      body: SafeArea(
        top: false,
        child: IndexedStack(
          index: _currentIndex,
          children: allDestinations.map<Widget>((Destination destination) {
            return DestinationView(destination: destination, camera: widget.camera, userID: widget.userID);
          }).toList(),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (int index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: allDestinations.map((Destination destination) {
          return BottomNavigationBarItem(
            icon: Icon(destination.icon),
            backgroundColor: destination.color,
            title: Text(destination.title)
          );
        }).toList(),
      ),
    );
  }
}

class SearchPage extends StatefulWidget {
  final String userID;
  SearchPage({ Key key, this.userID }) : super(key: key);

  @override
  _SearchPageState createState() => new _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
 // final formKey = new GlobalKey<FormState>();
 // final key = new GlobalKey<ScaffoldState>();
  final TextEditingController _filter = new TextEditingController();
  final dio = new Dio();
  String _searchText = "";
  List names = new List();
  List filteredNames = new List();
  Icon _searchIcon = new Icon(Icons.search);
  Widget _appBarTitle = new Text('Search');

  Future<Set<String>> _saved;

  _SearchPageState() {
    _filter.addListener(() {
      if (_filter.text.isEmpty) {
        setState(() {
          _searchText = "";
          filteredNames = names;
        });
      } else {
        setState(() {
          _searchText = _filter.text;
        });
      }
    });
  }

  @override
  void initState() {
    this._getNames();
    super.initState();
  }

  Future<Set<String>> _getFavoriteAnimalsSet() async {
    String _userID = widget.userID;
    print('UserID: ' + _userID);
    String url = 'https://narwhal-poosd.herokuapp.com/api/user/listfavorites';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"userID": "$_userID"}';
    
    print('Sending POST: ' + json);

    var data = await http.post(url, headers: headers, body: json);

    print(data.body);

    List<dynamic> response = jsonDecode(data.body);

    print(response);

    Set<String> setOfFavorites = new Set();

    for (var item in response) {
      setOfFavorites.add(item);
    }

    return setOfFavorites;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildBar(context),
      body: Container(
        child: _buildList(),
      ),
      resizeToAvoidBottomPadding: false,
    );
  }

  Widget _buildBar(BuildContext context) {
    return new AppBar(
      centerTitle: true,
      title: _appBarTitle,
      leading: new IconButton(
        icon: _searchIcon,
        onPressed: _searchPressed,
      ),
    );
  }

  void _unfavorite(String _animalName) async {
    print('Unfavorite ' + _animalName);

    String _userID = widget.userID;
    print('UserID: ' + _userID);
    String url = 'https://narwhal-poosd.herokuapp.com/api/user/unfavorite';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"userID": "$_userID", "animalName": "$_animalName"}';

    print('Sending POST: ' + json);

    var data = await http.post(url, headers: headers, body: json);

    print(data.body);    
  }

  void _favorite(String _animalName) async {
    print('Favorite ' + _animalName);

    String _userID = widget.userID;
    print('UserID: ' + _userID);
    String url = 'https://narwhal-poosd.herokuapp.com/api/user/favorite';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"userID": "$_userID", "animalName": "$_animalName"}';

    print('Sending POST: ' + json);

    var data = await http.post(url, headers: headers, body: json);

    print(data.body);    
  }

  Widget _buildList() {
    if (_searchText.isNotEmpty) {
      List tempList = new List();
      for (int i = 0; i < filteredNames.length; i++) {
        if (filteredNames[i].toLowerCase().contains(_searchText.toLowerCase())) {
          tempList.add(filteredNames[i]);
        }
      }
      filteredNames = tempList;
    }
    return ListView.builder(
      itemCount: names == null ? 0 : filteredNames.length,
      itemBuilder: (BuildContext context, int index) {
        // bool alreadySaved = _saved.contains(filteredNames[index]);
        return Card(
          child: ListTile(
            title: Text(filteredNames[index]),
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => DisplayAnimalPage(animalName: filteredNames[index])),
            ),
            /*
            trailing: IconButton(
              icon: alreadySaved ? new Icon(Icons.favorite) : new Icon(Icons.favorite_border),
              color: alreadySaved ? Colors.red : null,
              onPressed: () {
                alreadySaved ? _unfavorite(filteredNames[index]) : _favorite(filteredNames[index]);
                setState(() {
                  _saved = _getFavoriteAnimalsSet();
                });
              },
            ),
            */
          ),
        );
      },
    );
  }

  void _searchPressed() {
    setState(() {
      if (this._searchIcon.icon == Icons.search) {
        this._searchIcon = new Icon(Icons.close);
        this._appBarTitle = new TextField(
          controller: _filter,
          decoration: new InputDecoration(
            prefixIcon: new Icon(Icons.search),
            hintText: 'Search...'
          ),
        );
      } else {
        this._searchIcon = new Icon(Icons.search);
        this._appBarTitle = new Text('Search');
        filteredNames = names;
        _filter.clear();
      }
    });
  }

  void _getNames() async {
    var data = await http.get('https://narwhal-poosd.herokuapp.com/api/animals/getall');
    List<dynamic> allAnimals = jsonDecode(data.body);

    List tempList = new List();
    Set<String> tempSet = new Set();

    for (int i = 0; i < allAnimals.length; i++) {
      if (allAnimals[i]['name'] != null)
        tempList.add(allAnimals[i]['name']);
        tempSet.add(allAnimals[i]['name']);
    }
    setState(() {
      names = tempList;
      filteredNames = names;
    });
  }
}

class DisplayAnimalPage extends StatelessWidget {
  final animalName;

  DisplayAnimalPage({ Key key, this.animalName }): super(key: key);

  Future<List<String>> _getAnimalFacts() async {
    var data = await http.get("https://narwhal-poosd.herokuapp.com/api/animals/" + this.animalName);
    Map<String, dynamic> animal = jsonDecode(data.body);

    List<dynamic> animalInfo = animal['animal'];
    
    print('This animal name you clicked is: ' + this.animalName);

    List<String> animalFacts = [];

    if (animalInfo == null) return animalFacts;

    var factList = animalInfo[0]['facts'];
    for (var fact in factList) {
      animalFacts.add(fact);
    }

    return animalFacts;
  }

  Future<String> _getAnimalImage() async {
    var data = await http.get("https://narwhal-poosd.herokuapp.com/api/animals/" + this.animalName);
    Map<String, dynamic> animal = jsonDecode(data.body);

    if (animal['animal'] == null) return null;

    List<dynamic> animalInfo = animal['animal'];

    if (animalInfo == null) return null;

    print('Attempting to pull up Image with URL:');
    print(animalInfo[0]['image']);

    return animalInfo[0]['image']; 
  }
  Future<List<AnimalInfo>> _getAnimalInfo() async {
    var data = await http.get("https://narwhal-poosd.herokuapp.com/api/animals/" + this.animalName);
    Map<String, dynamic> animal = jsonDecode(data.body);
    List<AnimalInfo> list = [];
    if (animal['animal'] == null) return list;
    Map<String, dynamic> animalInfo = animal['animal'][0];

    for (var entry in animalInfo.entries) {
      if (entry.key == 'summary' || entry.key == 'weight' || entry.key == 'lifespan') {
        list.add(new AnimalInfo(entry.key, entry.value));
      }
    }

    return list;
  }

  @override
  Widget build(BuildContext context) {
    Widget animalInfo = new Container(
      child: FutureBuilder(
        future: _getAnimalInfo(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.data == null) {
            return Container(
              child: Center(
                child: Text("Loading...")
              )
            );
          } else {
            var list = ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: snapshot.data.length,
              itemBuilder: (BuildContext context, int index) {
                return Card(
                  child: ListTile(
                    title: Text(snapshot.data[index].type),
                    subtitle: Text(snapshot.data[index].info)
                  ),
                );
              },
            );

            return list;
          }
        },
      ),
    );

    Widget animalFacts = new Container(
      child: FutureBuilder(
        future: _getAnimalFacts(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.data == null) {
            return Container(
              child: Center(
                child: Text("Loading...")
              )
            );
          } else {
            return ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: snapshot.data.length,
              itemBuilder: (BuildContext context, int index) {
                return Card(
                  child: ListTile(
                    title: Text(snapshot.data[index]),
                  ),
                );
              },
            );
          }
        },
      ),
    );

    Widget animalImage = new Container(
      child: FutureBuilder(
        future: _getAnimalImage(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.data == null) {
            return Image.network(
              'https://images.unsplash.com/photo-151652838761' +
              '8-afa90b13e000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQi' +
              'OjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            );
          } else {
            return Image.network(
              snapshot.data,
            );
          }
        }
      )
    );

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(this.animalName),
      ),
      body: new Scrollbar(
        child: ListView(
          children: <Widget>[
            animalImage,
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
              'Animal Information',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20.0,
                ),
              ),
            ),
            animalInfo,
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
              'Fun Facts', 
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20.0,
                ),
              ),
            ),
            animalFacts,
          ],
        )
      )
    );
  }
}

class LoginPage extends StatefulWidget {
  final CameraDescription camera;

  const LoginPage({
    Key key,
    this.camera,
  }) : super(key: key);
  @override

  State<StatefulWidget> createState() => new _LoginPageState();
}

// Used for controlling whether the user is loggin or creating an account
enum FormType {
  login,
  register
}

class _LoginPageState extends State<LoginPage> {

  final TextEditingController _emailFilter = new TextEditingController();
  final TextEditingController _passwordFilter = new TextEditingController();
  final TextEditingController _ageFilter = new TextEditingController();
  final TextEditingController _locationFilter = new TextEditingController();
  String _email = "";
  String _password = "";
  String _age = "";
  String _location = "";
  FormType _form = FormType.login; // our default setting is to login, and we should switch to creating an account when the user chooses to

  _LoginPageState() {
    _emailFilter.addListener(_emailListen);
    _passwordFilter.addListener(_passwordListen);
    _ageFilter.addListener(_ageListen);
    _locationFilter.addListener(_locationListen);
  }

  void _emailListen() {
    if (_emailFilter.text.isEmpty) {
      _email = "";
    } else {
      _email = _emailFilter.text;
    }
  }

  void _passwordListen() {
    if (_passwordFilter.text.isEmpty) {
      _password = "";
    } else {
      _password = _passwordFilter.text;
    }
  }

  void _ageListen() {
    if (_ageFilter.text.isEmpty) {
      _age = "";
    } else {
      _age = _ageFilter.text;
    }
  }

  void _locationListen() {
    if (_locationFilter.text.isEmpty) {
      _location = "";
    } else {
      _location = _locationFilter.text;
    }
  }

  // Swap in between our two forms, registering and logging in
  void _formChange () async {
    setState(() {
      if (_form == FormType.register) {
        _form = FormType.login;
      } else {
        _form = FormType.register;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: _buildBar(context),
      body: new Container(
        padding: EdgeInsets.all(16.0),
        child: new Column(
          children: <Widget>[
            _buildTextFields(),
            _buildButtons(),
          ],
        ),
      ),
    );
  }

  Widget _buildBar(BuildContext context) {
    return new AppBar(
      title: new Text('Narwhal'),
      centerTitle: true,
    );
  }

  Widget _buildTextFields() {
    if (_form == FormType.login) {
      return new Container(
        child: new Column(
          children: <Widget>[
            new Container(
              child: new TextField(
                controller: _emailFilter,
                decoration: new InputDecoration(
                  labelText: 'Email'
                ),
              ),
            ),
            new Container(
              child: new TextField(
                controller: _passwordFilter,
                decoration: new InputDecoration(
                  labelText: 'Password'
                ),
                obscureText: true,
              ),
            )
          ],
        ),
      );
    } else {
       return new Container(
        child: new Column(
          children: <Widget>[
            new Container(
              child: new TextField(
                controller: _emailFilter,
                decoration: new InputDecoration(
                  labelText: 'Email'
                ),
              ),
            ),
            new Container(
              child: new TextField(
                controller: _passwordFilter,
                decoration: new InputDecoration(
                  labelText: 'Password'
                ),
                obscureText: true,
              ),
            ),
            new Container(
              child: new TextField(
                controller: _ageFilter,
                decoration: new InputDecoration(
                  labelText: 'Age'
                ),
              ),
            ),
            new Container(
              child: new TextField(
                controller: _locationFilter,
                decoration: new InputDecoration(
                  labelText: 'Location'
                ),
              ),
            )
          ],
        ),
      );     
    }
  }

  Widget _buildButtons() {
    if (_form == FormType.login) {
      return new Container(
        child: new Column(
          children: <Widget>[
            new RaisedButton(
              child: new Text('Login'),
              onPressed: _loginPressed,
            ),
            new FlatButton(
              child: new Text('Dont have an account? Tap here to register.'),
              onPressed: _formChange,
            ),
          ],
        ),
      );
    } else {
      return new Container(
        child: new Column(
          children: <Widget>[
            new RaisedButton(
              child: new Text('Create an Account'),
              onPressed: _createAccountPressed,
            ),
            new FlatButton(
              child: new Text('Have an account? Click here to login.'),
              onPressed: _formChange,
            )
          ],
        ),
      );
    }
  }
  // These functions can self contain any user auth logic required, they all have access to _email and _password

  void _loginPressed () async {
    print('The user wants to login with $_email and $_password');

    String url = 'https://narwhal-poosd.herokuapp.com/api/user/login';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"email": "$_email", "password": "$_password"}';
    var data = await http.post(url, headers: headers, body: json);

    print(data.body);

    Map<String, dynamic> response = jsonDecode(data.body);

    if (response['success'] == true) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => HomePage(
            camera: widget.camera, userID: response['userID']
          )
        )
      );
    }
  }

  void _createAccountPressed () async {
    print('The user wants to create an accoutn with $_email and $_password');

    String url = 'https://narwhal-poosd.herokuapp.com/api/user/register';
    Map<String, String> headers = {"Content-type": "application/json"};
    String json = '{"email": "$_email", "password": "$_password", "age": "$_age", "location": "$_location"}';
    var data = await http.post(url, headers: headers, body: json);

    print(data.body);

    Map<String, dynamic> response = jsonDecode(data.body);

    if (response['success'] == true) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => HomePage(
            camera: widget.camera,
            userID: response['userID']
          )
        )
      );      
    }
  }
}

Future<void> main() async {
  // Obtain a list of the available cameras on the device.
  final cameras = await availableCameras();

  // Get a specific camera from the list of available cameras.
  final firstCamera = cameras.first;

  runApp(
    MaterialApp(
      theme: new ThemeData(
        primarySwatch: Colors.cyan,
      ),
      /*
      home: TakePictureScreen(
        // Pass the appropriate camera to the TakePictureScreen widget.
        camera: firstCamera,
      ),
      */
      // home: HomePage(camera: firstCamera),
      home: new LoginPage(camera: firstCamera),
    ),
  );
}
